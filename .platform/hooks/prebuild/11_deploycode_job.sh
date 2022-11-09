#!/bin/bash
sudo mkdir /var/app/current
cd /var/app/current
sudo cp -R /var/app/staging/* /var/app/current -f
sudo su
sudo npm install pm2 -g
sudo npm install deasync -g --unsafe-perm
sudo npm install node-gyp -g