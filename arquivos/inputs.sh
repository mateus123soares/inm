TELEGRAF_URL="http://192.168.0.11:8086"
TELEGRAF_DATABASE="telegraf"
TELEGRAF_USERNAME="admin"
TELEGRAF_PASSWORD="admin"
TELEGRAF_FOLDER="/etc/telegraf/telegraf.conf"

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