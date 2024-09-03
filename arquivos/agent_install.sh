sudo wget https://repo.zabbix.com/zabbix/6.4/ubuntu/pool/main/z/zabbix-release/zabbix-release_6.4-1+ubuntu22.04_all.deb
sudo dpkg -i zabbix-release_6.4-1+ubuntu22.04_all.deb
sudo apt update
sudo apt install zabbix-agent2 zabbix-agent2-plugin-*
sudo systemctl restart zabbix-agent2
sudo systemctl enable zabbix-agent2 
sudo rm -rf zabbix-release_6.4-1+ubuntu22.04_all.deb

API_HOST=localhost:3333
HOSTNAME=$(echo $HOSTNAME)
INTERFACE=$(ip route | awk '/default/ {print $5}')
IP=$(ip addr show dev "$INTERFACE" | awk '$1 == "inet" {print $2}' | cut -d'/' -f1)

curl --request POST \
  --url "http://$API_HOST/zabbix/host/new" \
  --header 'Content-Type: application/json' \
  --data "{
    \"name\": \"$HOSTNAME\",
    \"interface\": \"$INTERFACE\",
    \"ip\": \"$IP\",
    \"hostname\": \"$HOSTNAME\"
}"