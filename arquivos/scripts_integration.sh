#!/bin/bash

##DEFINE COLORS
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
ENDCOLOR="\e[0m"

echo -e "${GREEN}Iniciando processo de integração...${ENDCOLOR}"

echo -e "${GREEN}Configurando Grafana [0/3] ${ENDCOLOR}"

echo -e "${YELLOW}Instalando plugin do zabbix [1/3] ${ENDCOLOR}"

sudo grafana-cli plugins install alexanderzobnin-zabbix-app

sudo grafana-cli plugins enable alexanderzobnin-zabbix-app


echo -e "${YELLOW}Habilitando plugin do Zabbix [2/3] ${ENDCOLOR}"

sudo echo "
# # config file version
apiVersion: 1

apps:
  - type: alexanderzobnin-zabbix-app
    org_name: Main Org.
    disabled: false
" > /etc/grafana/provisioning/plugins/default.yaml

echo -e "${YELLOW} Adicionando datasource do zabbix [3/3] ${ENDCOLOR}"

sudo echo "
apiVersion: 1

datasources:
- name: Zabbix
  type: alexanderzobnin-zabbix-datasource
  url: http://192.168.0.113/zabbix/api_jsonrpc.php
  isDefault: true
  jsonData:
    # Zabbix API credentials
    username: Admin
    password: zabbix
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
  url: 192.168.0.113
  database: zabbix
  user: grafana
  secureJsonData:
    password: "zabbix"
  editable: true
" > /etc/grafana/provisioning/datasources/default.yaml

sudo systemctl restart grafana-server