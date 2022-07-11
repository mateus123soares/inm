#!/bin/bash

##DEFINE COLORS
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
ENDCOLOR="\e[0m"


## Testando criacao arquivo de variaveis
if [ -f .env ]
then
  export $(cat .env | xargs)
  DBPassword=zabbix
  DBHost=localhost
  DBName=zabbix
  DBUser=zabbix
else
  echo -e "${RED}Falha na instalacao, Por favor criar um arquivo .env com as definicoes de variaveis, ${ENDCOLOR}"
  exit 0;
fi

echo -e "${GREEN}Iniciando processo de instalacao...${ENDCOLOR}"

##########################
#### INSTALAÇÃO ZABBIX ###
##########################

echo -e "${GREEN}Realizando o download e instalacao do Zabbix [0/3] ${ENDCOLOR}"

echo -e "${YELLOW}Realizando o download [1/3] ${ENDCOLOR}"

sudo wget https://repo.zabbix.com/zabbix/5.4/ubuntu/pool/main/z/zabbix-release/zabbix-release_5.4-1+ubuntu20.04_all.deb

echo -e "${YELLOW}Instalando software [2/3] ${ENDCOLOR}"

sudo dpkg -i zabbix-release_5.4-1+ubuntu20.04_all.deb

echo -e "${YELLOW}Removendo arquivos [3/3] ${ENDCOLOR}"

sudo rm -f zabbix-release_5.4-1+ubuntu20.04_all.deb

echo -e "${GREEN}Processo finalizado com sucesso.${ENDCOLOR}"

#########################
#### INSTALAÇÃO MYSQL ###
#########################

echo -e "${GREEN}Realizando o download e instalacao do Mysql [0/2]${ENDCOLOR}"

echo -e "${YELLOW}Realizando o download [1/2] ${ENDCOLOR}"

sudo apt update 

echo -e "${YELLOW}Instalando software [2/2] ${ENDCOLOR}"

sudo apt install mysql-server -y

echo -e "${GREEN}Processo finalizado com sucesso.${ENDCOLOR}"

####################################
#### CONFIGURAÇÃO MYSQL E ZABBIX ###
####################################

echo -e "${GREEN}Instalando dependencias e realizando configuracao [0/4]${ENDCOLOR}"

sudo apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent -y

echo -e "${YELLOW}Criando tabela no banco dados [1/4] ${ENDCOLOR}"

sudo mysql -uroot -e "create database $DBName character set utf8 collate utf8_bin;"

echo -e "${YELLOW}Criando usuarios no banco dados [2/4] ${ENDCOLOR}"

sudo mysql -uroot -e "create user '$DBUser'@'localhost' identified by '$DBPassword';"
sudo mysql -uroot -e "grant all privileges on $DBName.* to '$DBUser'@'localhost';"
sudo mysql -uroot -e "create user 'grafana'@'%' identified by '$DBPassword';"
sudo mysql -uroot -e "grant all privileges on $DBName.* to 'grafana'@'%';"

echo -e "${YELLOW}Importanto tabelas do zabbix para o Mysql [3/4] ${ENDCOLOR}"

zcat /usr/share/doc/zabbix-sql-scripts/mysql/create.sql.gz | mysql -u $DBUser -p$DBPassword $DBName

echo -e "${YELLOW}Configurando conexao do banco no zabbix [4/4] ${ENDCOLOR}"

sudo sed s/DBUser=zabbix/DBUser=$DBUser/g -i /etc/zabbix/zabbix_server.conf

sudo sed "/DBHost=localhost/a DBHost=$DBHost" -i /etc/zabbix/zabbix_server.conf

sudo sed "/DBPassword=/a DBPassword=$DBPassword" -i /etc/zabbix/zabbix_server.conf

sudo sed s/DBName=zabbix/DBName=$DBName/g -i /etc/zabbix/zabbix_server.conf

####################################
#### CONFIGURAÇÃO NTOP ###
####################################

echo -e "${GREEN}Instalando dependencias e realizando configuracao [0/3]${ENDCOLOR}"

echo -e "${YELLOW}Instalando dependencias para o ntop [1/3] ${ENDCOLOR}"

sudo apt-get install software-properties-common wget 
sudo add-apt-repository universe 

echo -e "${YELLOW}Realizando o download do ntop [2/3] ${ENDCOLOR}"

sudo wget https://packages.ntop.org/apt-stable/20.04/all/apt-ntop-stable.deb 
sudo apt install ./apt-ntop-stable.deb
sudo apt install ntopng -y

echo -e "${YELLOW}Instalando o ntop [3/3] ${ENDCOLOR}"

sudo apt-get clean all 
sudo apt-get update 
sudo apt-get install pfring-dkms nprobe ntopng n2disk cento -y

echo "-w=3001" | sudo tee -a /etc/ntopng/ntopng.conf

####################################
#### CONFIGURAÇÃO INFLUXDB ###
####################################

echo -e "${GREEN}Instalando dependencias e realizando configuracao ${ENDCOLOR}"

wget -q https://repos.influxdata.com/influxdb.key
echo '23a1c8836f0afc5ed24e0486339d7cc8f6790b83886c4c96995b88a061c5bb5d influxdb.key' | sha256sum -c && cat influxdb.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/influxdb.gpg > /dev/null
echo 'deb [signed-by=/etc/apt/trusted.gpg.d/influxdb.gpg] https://repos.influxdata.com/debian stable main' | sudo tee /etc/apt/sources.list.d/influxdata.list
sudo apt-get -y update && sudo apt-get install -y influxdb


echo -e "${GREEN}Restartando servicos...${ENDCOLOR}"

sudo systemctl start influxdb 
sudo systemctl restart zabbix-server zabbix-agent apache2
sudo systemctl enable zabbix-server zabbix-agent apache2 influxdb

echo -e "${GREEN}Processo de instalação finalizado com sucesso.${ENDCOLOR}"