#!/bin/bash

USER_LOGS="zeeklogs"

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

##################################
#### INSTALAÇÃO DO ZEEK ###
##################################

echo -e "${GREEN}Realizando o download e instalacao do Zeek [0/2] ${ENDCOLOR}"

echo -e "${YELLOW}Realizando o download [1/2] ${ENDCOLOR}"

echo 'deb http://download.opensuse.org/repositories/security:/zeek/xUbuntu_20.04/ /' | sudo tee /etc/apt/sources.list.d/security:zeek.list
curl -fsSL https://download.opensuse.org/repositories/security:zeek/xUbuntu_20.04/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/security_zeek.gpg > /dev/null
sudo apt update

echo -e "${YELLOW}Realizando a instalação [2/2] ${ENDCOLOR}"

sudo apt install -y zeek-lts
sudo apt-get -y install ssh

if [ -f /opt/zeek/etc/node.cfg]
then
    echo "Arquivo já existe, não é necessário criar"
else 
echo "
[zeek]
type=standalone
host=localhost
interface=enp0s8
" | sudo tee -a /opt/zeek/etc/node.cfg > /dev/null
fi

echo "ZeekPort = 27760" | sudo tee -a > /opt/zeek/etc/zeekctl.cfg > /dev/null

sudo setcap cap_net_raw+eip <path_to_zeek>/bin/zeek