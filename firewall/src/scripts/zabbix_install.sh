#!/bin/bash

##DEFINE COLORS
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
ENDCOLOR="\e[0m"

##DEFINE VARIABLES

ZABBIX_URL="https://repo.zabbix.com/zabbix/5.4/ubuntu/pool/main/z/zabbix-release/zabbix-release_5.4-1+ubuntu20.04_all.deb"
ZABBIX_PACKAGE="zabbix-release_5.4-1+ubuntu20.04_all.deb"
ZABBIX_CONFIG_FILE="/etc/zabbix/zabbix_server.conf"

## Testando criacao arquivo de variaveis
echo -e '\x1b[32;40m
::::::::::: ::::    ::: ::::    ::::  
    :+:     :+:+:   :+: +:+:+: :+:+:+ 
    +:+     :+:+:+  +:+ +:+ +:+:+ +:+ 
    +#+     +#+ +:+ +#+ +#+  +:+  +#+ 
    +#+     +#+  +#+#+# +#+       +#+ 
    #+#     #+#   #+#+# #+#       #+# 
########### ###    #### ###       ### 

Iniciando processo de instalacao...
\x1b[m
'            

## Testando criacao arquivo de variaveis
if [ -f .env ]
then
  DB_PASSWORD=zabbix
  DB_HOST=localhost
  DB_NAME=zabbix
  DB_USER=zabbix
else
  echo -e "${RED}Falha na instalacao, Por favor criar um arquivo .env com as definicoes de variaveis, ${ENDCOLOR}"
  exit 0;
fi

set -euo pipefail
trap 'echo -e "${RED}Falha na execução do script"' ERR INT

##########################
#### INSTALAÇÃO ZABBIX ###
##########################

echo -e "${GREEN}Realizando o download e instalacao do Zabbix [0/3] ${ENDCOLOR}"

echo -e "${YELLOW}Realizando o download [1/3] ${ENDCOLOR}"

sudo wget $ZABBIX_URL

echo -e "${YELLOW}Instalando software [2/3] ${ENDCOLOR}"

sudo dpkg -i $ZABBIX_PACKAGE

echo -e "${YELLOW}Removendo arquivos [3/3] ${ENDCOLOR}"

sudo rm -f $ZABBIX_PACKAGE

echo -e "${GREEN}Processo finalizado com sucesso.${ENDCOLOR}"

#########################
#### INSTALAÇÃO MYSQL ###
#########################

echo -e "${GREEN}Realizando o download e instalacao do Mysql [0/2]${ENDCOLOR}"

echo -e "${YELLOW}Realizando o update source list [1/2] ${ENDCOLOR}"

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

sudo mysql -uroot -e "create database $DB_NAME character set utf8 collate utf8_bin;"

echo -e "${YELLOW}Criando usuarios no banco dados [2/4] ${ENDCOLOR}"

sudo mysql -uroot -e "create user '$DB_USER'@'localhost' identified by '$DB_PASSWORD';"
sudo mysql -uroot -e "grant all privileges on $DB_NAME.* to '$DB_USER'@'localhost';"
sudo mysql -uroot -e "create user 'grafana'@'%' identified by '$DB_PASSWORD';"
sudo mysql -uroot -e "grant all privileges on $DB_NAME.* to 'grafana'@'%';"

echo -e "${YELLOW}Importanto tabelas do zabbix para o Mysql [3/4] ${ENDCOLOR}"

zcat /usr/share/doc/zabbix-sql-scripts/mysql/create.sql.gz | mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME

echo -e "${YELLOW}Configurando conexao do banco no zabbix [4/4] ${ENDCOLOR}"

sudo sed s/DBUser=zabbix/DBUser=$DB_USER/g -i $ZABBIX_CONFIG_FILE
sudo sed "/DBHost=localhost/a DBHost=$DB_HOST" -i $ZABBIX_CONFIG_FILE
sudo sed "/DBPassword=/a DBPassword=$DB_PASSWORD" -i $ZABBIX_CONFIG_FILE
sudo sed s/DBName=zabbix/DBName=$DB_NAME/g -i $ZABBIX_CONFIG_FILE

echo -e "${GREEN}Restartando servicos...${ENDCOLOR}"

sudo systemctl restart zabbix-server zabbix-agent apache2
sudo systemctl enable zabbix-server zabbix-agent apache2 

sudo echo '
<?php
// Zabbix GUI configuration file.

$DB["TYPE"]				= "MYSQL";
$DB["SERVER"]			= "localhost";
$DB["PORT"]				= "0";
$DB["DATABASE"]			= "zabbix";
$DB["USER"]				= "zabbix";
$DB["PASSWORD"]			= "zabbix";

// Schema name. Used for PostgreSQL.
$DB["SCHEMA"]			= "";

// Used for TLS connection.
$DB["ENCRYPTION"]		= false;
$DB["KEY_FILE"]			= "";
$DB["CERT_FILE"]		= "";
$DB["CA_FILE"]			= "";
$DB["VERIFY_HOST"]		= false;
$DB["CIPHER_LIST"]		= "";

// Vault configuration. Used if database credentials are stored in Vault secrets manager.
$DB["VAULT_URL"]		= "";
$DB["VAULT_DB_PATH"]	= "";
$DB["VAULT_TOKEN"]		= "";

// Use IEEE754 compatible value range for 64-bit Numeric (float) history values.
// This option is enabled by default for new Zabbix installations.
// For upgraded installations, please read database upgrade notes before enabling this option.
$DB["DOUBLE_IEEE754"]	= true;

$ZBX_SERVER				= "localhost";
$ZBX_SERVER_PORT		= "10051";
$ZBX_SERVER_NAME		= "zabbix-server";

$IMAGE_FORMAT_DEFAULT	= IMAGE_FORMAT_PNG;
' > ./zabbix.conf.php

sudo mv ./zabbix.conf.php /etc/zabbix/web/
sudo chmod 644 /etc/zabbix/web/zabbix.conf.php

echo -e "${GREEN}Processo de instalação finalizado com sucesso.${ENDCOLOR}"