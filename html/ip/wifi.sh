#!/bin/bash
echo "enabeling normal wifi connection, pi will restart"
sudo systemctl stop hostapd &&
sudo rm /etc/dhcpcd.conf.bac &&
sudo cp /etc/dhcpcd.conf /etc/dhcpcd.conf.bac &&
sudo cp /etc/dhcpcd.conf.wifi /etc/dhcpcd.conf &&

sudo rm /etc/hosts.bac &&
sudo cp /etc/hosts /etc/hosts.bac &&
sudo cp /etc/hosts.wifi /etc/hosts &&

echo '#normal wifi mode currently enabled \nsh /var/www/html/ip/ap.sh' > /var/www/html/ip/toggle.sh &&
echo 'wifi' > /var/www/html/ip/mode.txt &&
sudo reboot

