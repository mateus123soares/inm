TELEGRAF_FOLDER="/etc/telegraf/telegraf.conf"
USER_FIREWALL="ufw_user"

ZABBIX_HOSTNAME=$(hostname)

read -p "Enter Zabbix Host (Ex: 127.0.0.1): " ZABBIX_SERVER
read -p "Enter Telegraf Host: " TELEGRAF_URL
read -p "Enter Telegraf database: " TELEGRAF_DATABASE
read -p "Enter Telegraf Name: " TELEGRAF_USERNAME
read -p "Enter Telegraf Password: " TELEGRAF_PASSWORD


sudo apt-get update
sudo apt-get install curl
curl -s https://repos.influxdata.com/influxdb.key | sudo tee /etc/apt/trusted.gpg.d/influxdb.asc >/dev/null
source /etc/os-release
echo "deb https://repos.influxdata.com/${ID} ${VERSION_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo apt-get update && sudo apt-get install telegraf

sudo sed -i "/^\[\[outputs.influxdb\]\].*/a urls = [\"$TELEGRAF_URL\"] \n database = \"$TELEGRAF_DATABASE\" \n username = \"$TELEGRAF_USERNAME\" \n password = \"$TELEGRAF_PASSWORD\" \n " $TELEGRAF_FOLDER

echo "[[inputs.tail]]
files = [\"/var/log/ufw.log\"]
from_beginning = true
name_override = \"ufw_log\"
watch_method = \"poll\" 
grok_patterns = [\"%{CUSTOM_LOG_FORMAT}\"]
grok_custom_patterns = '''
    CUSTOM_LOG_FORMAT %{SYSLOGTIMESTAMP:ufw_timestamp:ts-syslog} %{SYSLOGHOST:ufw_hostname} %{DATA:ufw_program}: %{DATA:user}%{NUMBER:uptime}%{DATA:user} %{DATA:user}UFW %{WORD:ufw_action}%{DATA:user} IN=%{DATA:ufw_interface} OUT= (MAC|PHYSIN)=%{DATA:ufw_mac} SRC=%{IP:ufw_src_ip} DST=%{IP:ufw_dest_ip}( LEN=%{NUMBER:ufw_packet_len})? %{GREEDYDATA:ufw_tcp_opts} PROTO=%{WORD:ufw_protocol}( SPT=%{NUMBER:ufw_source_port})?( DPT=%{NUMBER:ufw_dest_port})?%{GREEDYDATA:ufw_tcp_opts}
'''
data_format = \"grok\"
grok_custom_pattern_files = []
grok_timezone = \"America/Araguaina\" 
" | sudo tee -a $TELEGRAF_FOLDER > /dev/null

wget https://repo.zabbix.com/zabbix/5.4/ubuntu/pool/main/z/zabbix/zabbix-agent_5.4.7-1+ubuntu20.04_amd64.deb
sudo dpkg -i zabbix-agent_5.4.7-1+ubuntu20.04_amd64.deb
sudo apt-get install zabbix-agent -y


sudo sed "/Hostname=Zabbix server/a Hostname=$ZABBIX_HOSTNAME" -i /etc/zabbix/zabbix_agentd.conf
sudo sed "s/ServerActive=127.0.0.1/ServerActive=$ZABBIX_SERVER/g" -i /etc/zabbix/zabbix_agentd.conf
sudo sed "s/Server=127.0.0.1/Server=$ZABBIX_SERVER/g" -i /etc/zabbix/zabbix_agentd.conf
