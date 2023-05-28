USER_FIREWALL="ufw_user"

sudo useradd -m -d /home/$USER_FIREWALL -s /bin/bash $USER_FIREWALL
echo "Insert password for $USER_FIREWALL: "
sudo passwd $USER_FIREWALL

read -p "Enter Public Key from server " PUBLIC_KEY

if [ -f /home/$USER_FIREWALL/.ssh/authorized_keys ]
then
    sudo echo "$PUBLIC_KEY" | sudo tee -a /home/$USER_FIREWALL/.ssh/authorized_keys
else
    sudo mkdir /home/$USER_FIREWALL/.ssh/
    sudo touch /home/$USER_FIREWALL/.ssh/authorized_keys
    sudo echo "$PUBLIC_KEY" | sudo tee -a /home/$USER_FIREWALL/.ssh/authorized_keys
fi

sudo echo "$USER_FIREWALL ALL=(ALL) NOPASSWD: /usr/sbin/ufw" | sudo tee -a /etc/sudoers
sudo echo "$USER_FIREWALL ALL=(ALL) NOPASSWD: /usr/sbin/iptables *" | sudo tee -a /etc/sudoers
sudo echo "$USER_FIREWALL ALL=(ALL) NOPASSWD: /sbin/iptables-save " | sudo tee -a /etc/sudoers