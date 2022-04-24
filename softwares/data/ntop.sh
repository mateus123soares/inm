sudo apt-get install software-properties-common wget -y
sudo add-apt-repository universe 
sudo wget https://packages.ntop.org/apt-stable/20.04/all/apt-ntop-stable.deb 
sudo apt install ./apt-ntop-stable.deb -y
sudo apt-get clean all
sudo apt-get update
sudo apt-get install pfring-dkms nprobe ntopng n2disk cento -y

sudo wget -qO- https://repos.influxdata.com/influxdb.key | gpg --dearmor > /etc/apt/trusted.gpg.d/influxdb.gpg
export DISTRIB_ID=$(lsb_release -si); export DISTRIB_CODENAME=$(lsb_release -sc)
sudo echo "deb [signed-by=/etc/apt/trusted.gpg.d/influxdb.gpg] https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" > /etc/apt/sources.list.d/influxdb.list

sudo apt-get update && sudo apt-get install influxdb
sudo service influxdb start
