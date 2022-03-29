package service

import (
	"context"
	"sync"
	"time"

	"github.com/grafana/grafana/pkg/infra/log"
	"github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/services/secrets"
	"github.com/grafana/grafana/pkg/services/sqlstore"
)

func ProvideService(store *sqlstore.SQLStore, secretsService secrets.Service) *Service {
	s := &Service{
		sqlStore: store,
		decryptionCache: secureJSONDecryptionCache{
			cache: make(map[int64]cachedDecryptedJSON),
		},
		secretsService: secretsService,
		logger:         log.New("pluginsettings"),
	}

	return s
}

type Service struct {
	sqlStore        *sqlstore.SQLStore
	decryptionCache secureJSONDecryptionCache
	secretsService  secrets.Service

	logger log.Logger
}

type cachedDecryptedJSON struct {
	updated time.Time
	json    map[string]string
}

type secureJSONDecryptionCache struct {
	cache map[int64]cachedDecryptedJSON
	sync.Mutex
}

func (s *Service) GetPluginSettings(ctx context.Context, orgID int64) ([]*models.PluginSettingInfoDTO, error) {
	return s.sqlStore.GetPluginSettings(ctx, orgID)
}

func (s *Service) GetPluginSettingById(ctx context.Context, query *models.GetPluginSettingByIdQuery) error {
	return s.sqlStore.GetPluginSettingById(ctx, query)
}

func (s *Service) UpdatePluginSetting(ctx context.Context, cmd *models.UpdatePluginSettingCmd) error {
	var err error
	cmd.EncryptedSecureJsonData, err = s.secretsService.EncryptJsonData(ctx, cmd.SecureJsonData, secrets.WithoutScope())
	if err != nil {
		return err
	}

	return s.sqlStore.UpdatePluginSetting(ctx, cmd)
}

func (s *Service) UpdatePluginSettingVersion(ctx context.Context, cmd *models.UpdatePluginSettingVersionCmd) error {
	return s.sqlStore.UpdatePluginSettingVersion(ctx, cmd)
}

func (s *Service) DecryptedValues(ps *models.PluginSetting) map[string]string {
	s.decryptionCache.Lock()
	defer s.decryptionCache.Unlock()

	if item, present := s.decryptionCache.cache[ps.Id]; present && ps.Updated.Equal(item.updated) {
		return item.json
	}

	json, err := s.secretsService.DecryptJsonData(context.Background(), ps.SecureJsonData)
	if err != nil {
		s.logger.Error("Failed to decrypt secure json data", "error", err)
		return map[string]string{}
	}

	s.decryptionCache.cache[ps.Id] = cachedDecryptedJSON{
		updated: ps.Updated,
		json:    json,
	}

	return json
}
