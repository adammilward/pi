#!/bin/bash
echo "enabelling wireless access point, pi will restart"
sudo systemctl stop hostapd &&
sudo rm /etc/dhcpcd.conf.bac &&
sudo cp /etc/dhcpcd.conf /etc/dhcpcd.conf.bac &&
sudo cp /etc/dhcpcd.conf.ap /etc/dhcpcd.conf &&
echo '#ap server mode currently enabled \nsh /var/www/html/ip/wifi.sh' > /var/www/html/ip/toggle.sh &&
echo 'ap' > /var/www/html/ip/mode.txt
#sudo reboot

