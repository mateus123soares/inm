
MYSQL_URL=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=zabbix
MYSQL_USER=zabbix
MYSQL_PASSWORD=zabbix
ZABBIX_URL=localhost
ZABBIX_USER=Admin
ZABBIX_PASSWORD=zabbix

sudo grafana-cli plugins install alexanderzobnin-zabbix-app

echo """
apiVersion: 1

apps:
  - type: alexanderzobnin-zabbix-app
    org_name: Main Org.
    disabled: false
""" > /etc/grafana/provisioning/plugins/sample.yaml

echo """
apiVersion: 1

datasources:

- name: MySQL Zabbix
  type: mysql
  url: ${MYSQL_URL}:${MYSQL_PORT}
  database: ${MYSQL_DATABASE}
  user: ${MYSQL_USER}
  jsonData:
    maxOpenConns: 0 # Grafana v5.4+
    maxIdleConns: 2 # Grafana v5.4+
    connMaxLifetime: 14400 # Grafana v5.4+
  secureJsonData:
    password: ${MYSQL_PASSWORD}
  editable: true

- name: Zabbix
  type: alexanderzobnin-zabbix-datasource
  access: proxy
  url: http://${ZABBIX_URL}/zabbix/api_jsonrpc.php
  isDefault: true
  jsonData:
    # Zabbix API credentials
    username: ${ZABBIX_USER}
    password: ${ZABBIX_PASSWORD}
    # Trends options
    trends: true
    trendsFrom: "7d"
    trendsRange: "4d"
    # Cache update interval
    cacheTTL: "1h"
    # Alerting options
    alerting: true
    addThresholds: false
    alertingMinSeverity: 3
    # Direct DB Connection options
    dbConnectionEnable: true
    # Name of existing datasource for Direct DB Connection
    dbConnectionDatasourceName: MySQL Zabbix
    # Retention policy name (InfluxDB only) for fetching long-term stored data.
    # Leave it blank if only default retention policy used.
    dbConnectionRetentionPolicy: one_year
    # Disable acknowledges for read-only users
    disableReadOnlyUsersAck: true
    # Disable time series data alignment
    disableDataAlignment: false
    # Use value mapping from Zabbix
    useZabbixValueMapping: true
  version: 1
  editable: true

- name: MySQL Zabbix
  type: mysql
  url: ${MYSQL_URL}:${MYSQL_PORT}
  database: ${MYSQL_DATABASE}
  user: ${MYSQL_USER}
  password: ${MYSQL_PASSWORD}

""" > /etc/grafana/provisioning/datasources/sample.yaml