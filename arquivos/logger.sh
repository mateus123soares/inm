#!/bin/bash

####
REPO_INSTALL_DEBIAN="apt-get install -y"
REPO_INSTALL_REDHAT="yum install -y"
INSTALL_DIR="cd /tmp"

##DEFINE COLORS
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
ENDCOLOR="\e[0m"

$INSTALL_DIR

echo -e "${GREEN}Iniciando processo de instalacao...${ENDCOLOR}"

#################################
#### INSTALAÇÃO DO PROMETHEUS ###
#################################

echo -e "${GREEN}Realizando o download e instalacao do Prometheus [0/3] ${ENDCOLOR}"

echo -e "${YELLOW}Realizando o download [1/3] ${ENDCOLOR}"

sudo curl -LO https://github.com/prometheus/prometheus/releases/download/v2.43.0/prometheus-2.43.0.linux-amd64.tar.gz
sudo tar -zxvf prometheus-2.43.0.linux-amd64.tar.gz

echo -e "${YELLOW}Configurando o software software [2/3] ${ENDCOLOR}"

sudo useradd --no-create-home --shell /bin/false prometheus
sudo mkdir /etc/prometheus /var/lib/prometheus

sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus

sudo cp -v -p ./prometheus-2.43.0.linux-amd64/prometheus /usr/local/bin
sudo cp -v -p ./prometheus-2.43.0.linux-amd64/promtool /usr/local/bin
sudo chown prometheus:prometheus /usr/local/bin/prom*

sudo cp -v -r ./prometheus-2.43.0.linux-amd64/consoles /etc/prometheus
sudo cp -v -r ./prometheus-2.43.0.linux-amd64/console_libraries /etc/prometheus

sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries

sudo cp -v -p ./prometheus-2.43.0.linux-amd64/prometheus.yml /etc/prometheus
sudo chown prometheus:prometheus /etc/prometheus/prometheus.yml

echo -e "${YELLOW}Configurando arquivo prometheus.yml [3/3] ${ENDCOLOR}"

sudo cp -v /etc/prometheus/prometheus.yml /etc/prometheus/prometheus.yml.backup

if [ -f /etc/prometheus/prometheus.yml ]
then
    echo "Arquivo já existe, não é necessário criar"
else
echo "
# my global config
global:
  scrape_interval: 10s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 10s # Evaluate rules every 15 seconds. The default is every 1 minute.

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - 'first_rules.yml'
  # - 'second_rules.yml'

scrape_configs:
  # The job name is added as a label to any timeseries scraped from this config.
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: zeek
    static_configs:
      - targets: ['localhost:9144']

" | sudo tee -a /etc/prometheus/prometheus.yml > /dev/null
fi

if [ -f /etc/prometheus/prometheus.yml ]
then
    echo "Arquivo já existe, não é necessário criar"
else 
echo "
[Unit]
Description=PromServer
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
--config.file /etc/prometheus/prometheus.yml \
--storage.tsdb.path /var/lib/prometheus/ \
--web.console.templates=/etc/prometheus/consoles \
--web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target

" | sudo tee -a /etc/systemd/system/prometheus.service > /dev/null
fi

sudo systemctl daemon-reload
sudo systemctl start prometheus
#sudo systemctl status prometheus

echo -e "${GREEN}Processo finalizado com sucesso.${ENDCOLOR}"

##################################
#### INSTALAÇÃO DO Grok Logger ###
##################################

echo -e "${GREEN}Realizando o download e instalacao do Grok Logger [0/2] ${ENDCOLOR}"

echo -e "${YELLOW}Realizando o download [1/2] ${ENDCOLOR}"

sudo $REPO_INSTALL_DEBIAN zip
sudo curl -LO https://github.com/fstab/grok_exporter/releases/download/v1.0.0.RC5/grok_exporter-1.0.0.RC5.linux-amd64.zip
sudo unzip grok_exporter-1.0.0.RC5.linux-amd64.zip

echo -e "${YELLOW}Configurando o software software [2/2] ${ENDCOLOR}"

sudo mv -v grok_exporter-1.0.0.RC5.linux-amd64 /opt/grok-exporter

if [ -f /opt/grok-exporter/grok-exporter.service ]
then
    echo "Arquivo já existe, não é necessário criar"
else 
echo "

[Unit]
Description=Prometheus grok_exporter server
 
[Service]
Restart=always
WorkingDirectory=/opt/grok-exporter
ExecStart=/opt/grok-exporter/grok_exporter --config=/opt/grok-exporter/config.yml
ExecReload=/bin/kill -HUP $MAINPID
TimeoutStopSec=20s
SendSIGKILL=no

[Install]
WantedBy=multi-user.target " | sudo tee -a /opt/grok-exporter/grok-exporter.service > /dev/null
fi

if [ -f /opt/grok-exporter/grok-exporter.service ]
then
    echo "Arquivo já existe, não é necessário criar"
else 
sudo ln -s /opt/grok-exporter/grok-exporter.service /etc/systemd/system/grok-exporter.service
fi

sudo cp -v /opt/grok-exporter/example/config.yml /opt/grok-exporter/
sudo systemctl daemon-reload
sudo systemctl start grok-exporter.service

echo -e "${GREEN}Processo finalizado com sucesso.${ENDCOLOR}"