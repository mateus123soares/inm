#wget https://repo.zabbix.com/zabbix/5.4/ubuntu/pool/main/z/zabbix/zabbix-agent_5.4.7-1+ubuntu20.04_amd64.deb

#sudo dpkg -i zabbix-agent_5.4.7-1+ubuntu20.04_amd64.deb

#sudo apt-get install zabbix-agent -y

ZABBIX_SERVER="10.0.0.100"
ZABBIX_HOSTNAME="mateus"

ssh vagrant@10.0.0.100 -i "/home/mateus/Documentos/vagrant-client/.vagrant/machines/default/virtualbox/private_key" \
"wget https://repo.zabbix.com/zabbix/5.4/ubuntu/pool/main/z/zabbix/zabbix-agent_5.4.7-1+ubuntu20.04_amd64.deb && \
 sudo dpkg -i zabbix-agent_5.4.7-1+ubuntu20.04_amd64.deb && \
 sudo apt-get install zabbix-agent -y && \
 sudo sed '/Hostname=Zabbix server/a Hostname=$ZABBIX_HOSTNAME' -i /etc/zabbix/zabbix_agentd.conf && \
 sudo sed 's/ServerActive=127.0.0.1/ServerActive=$ZABBIX_SERVER/g' -i /etc/zabbix/zabbix_agentd.conf && \
 sudo sed 's/Server=127.0.0.1/Server=$ZABBIX_SERVER/g' -i /etc/zabbix/zabbix_agentd.conf"
