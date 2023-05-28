TELEGRAF_FOLDER="/etc/telegraf/telegraf.conf"
USER_FIREWALL="ufw_user"

ZABBIX_HOSTNAME=$(hostname)

read -p "Enter Telegraf Host: " TELEGRAF_URL
read -p "Enter Telegraf database: " TELEGRAF_DATABASE
read -p "Enter Telegraf Name: " TELEGRAF_USERNAME
read -p "Enter Telegraf Password: " TELEGRAF_PASSWORD


sudo apt-get update \
sudo apt-get install curl \
curl -s https://repos.influxdata.com/influxdb.key | sudo tee /etc/apt/trusted.gpg.d/influxdb.asc >/dev/null \
source /etc/os-release \
echo "deb https://repos.influxdata.com/${ID} ${VERSION_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list \
sudo apt-get update && sudo apt-get install influxdb

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

echo "[[inputs.tail]]
files = [\"/opt/zeek/logs/current/conn.log\"]
from_beginning = true
name_override = \"conn\"
watch_method = \"poll\" 
grok_patterns = [\"%{CUSTOM_LOG_FORMAT}\"]
grok_custom_patterns = '''
    CUSTOM_LOG_FORMAT %{NUMBER:timestamp:ts-epoch}       %{WORD:uuid}      %{IP:origem_host}   %{NUMBER:origem_port}   %{IP:dest_host}   %{NUMBER:dest_port}   (-|%{WORD:protocol})     (-|%{WORD:service})?       (-|%{NUMBER:duraction})
'''

data_format = \"grok\"
grok_custom_pattern_files = []
grok_timezone = \"America/Araguaina\" 
" | sudo tee -a $TELEGRAF_FOLDER > /dev/null

/usr/share/logstash/bin/logstash-plugin install logstash-output-influxdb

input {
    file {
        path => ["/opt/zeek/logs/current/conn.log"]
        start_position => "beginning"
    }
}
filter {
    grok {
      match => { "message" => "%{BASE16FLOAT:timestamp}\t%{WORD:uuid}\t%{IP:origem_host}\t%{NUMBER:origem_port}\t%{IP:dest_host}\t%{NUMBER:dest_port}\t(-|%{WORD:protocol})\t(-|%{WORD:service})?\t%{GREEDYDATA:message}"}
    }
}
output {

    stdout {
        codec => rubydebug
    }

    influxdb {
        exclude_fields => ["@version", "sequence"]
        db => "influxdb"
        host => "localhost"
        port => "8086"
        user => "admin"
        password => "admin"
        measurement => "zeek"
        send_as_tags => ["origem_host","origem_port","dest_host","dest_port","protocol"]
        coerce_values => {
            "timestamp" => "float"
            "duraction" => "float"
        }    
        data_points => {
            "@timestamp" => "%{@timestamp}"
            "timestamp" => "%{timestamp}"
            "uuid" => "%{uuid}"
            "origem_host"=>"%{origem_host}"
            "origem_port"=>"%{origem_port}"
            "dest_host"=>"%{dest_host}"
            "dest_port"=>"%{dest_port}"
            "protocol"=>"%{protocol}"
            "service"=>"%{service}"
            "duraction"=>"%{duraction}"
            "message" => "%{message}"
        }
    }
}

input {
    file {
        path => ["/opt/zeek/logs/current/conn.log"]
        start_position => "beginning"
    }
}
filter {
    grok {
      match => { "message" => "%{BASE16FLOAT:timestamp}\t%{WORD:uuid}\t%{IP:origem_host}\t%{NUMBER:origem_port}\t%{IP:dest_host}\t%{NUMBER:dest_port}\t(-|%{WORD:protocol})\t(-|%{WORD:service})?\t%{GREEDYDATA:message}"}
    }
}
output {

    stdout {
        codec => rubydebug
    }

    influxdb {
        exclude_fields => ["@version", "sequence"]
        db => "influxdb"
        host => "localhost"
        port => "8086"
        user => "admin"
        password => "admin"
        measurement => "zeek"
        send_as_tags => ["origem_host","origem_port","dest_host","dest_port","protocol"]
        coerce_values => {
            "timestamp" => "float"
            "duraction" => "float"
        }    
        data_points => {
            "@timestamp" => "%{@timestamp}"
            "timestamp" => "%{timestamp}"
            "uuid" => "%{uuid}"
            "origem_host"=>"%{origem_host}"
            "origem_port"=>"%{origem_port}"
            "dest_host"=>"%{dest_host}"
            "dest_port"=>"%{dest_port}"
            "protocol"=>"%{protocol}"
            "service"=>"%{service}"
            "duraction"=>"%{duraction}"
            "message" => "%{message}"
        }
    }
}
targets http://192.168.0.100:3000, http://192.168.0.100/zabbix


input {
        file{
            path => ["/opt/zeek/logs/current/conn.log"]
            start_position => "beginning"
              sincedb_path => "/dev/null"
             }
     }


filter {
    json {
        source => ["ts","uid","id.orig_h"]
    }
}

output {

        stdout {
                codec => rubydebug
            }

        influxdb  {
                db => "influxdb"
                host => "localhost"
                port => "8086"
                user => "admin"
                password => "admin"
                measurement => "zeek"
                codec => "json"
                use_event_fields_for_data_points => true
                data_points => {
                }
        }
    }