wget https://repo.zabbix.com/zabbix/5.4/ubuntu/pool/main/z/zabbix/zabbix-agent_5.4.7-1+ubuntu20.04_amd64.deb

sudo dpkg -i zabbix-agent_5.4.7-1+ubuntu20.04_amd64.deb

sudo apt-get install zabbix-agent -y

ZABBIX_SERVER="10.0.0.101"
ZABBIX_HOSTNAME=$(hostname -f)
API_SERVER="10.0.0.118:3333"
IP_HOST=$(hostname -I | awk '{print $2}')

sudo sed "s/Hostname=Zabbix server/Hostname=$ZABBIX_HOSTNAME/g" -i /etc/zabbix/zabbix_agentd.conf
sudo sed "s/ServerActive=127.0.0.1/ServerActive=$ZABBIX_SERVER/g" -i /etc/zabbix/zabbix_agentd.conf
sudo sed "s/Server=127.0.0.1/Server=$ZABBIX_SERVER/g" -i /etc/zabbix/zabbix_agentd.conf

curl --request POST \
  --url http://$API_SERVER/zabbix/host/new \
  --header 'Content-Type: application/json' \
  --data '{
	"ip":"'$IP_HOST'",
	"hostname":"'$ZABBIX_HOSTNAME'"
}'

sudo rm -f zabbix-agent_5.4.7-1+ubuntu20.04_amd64.deb
sudo systemctl restart zabbix-agent.service
