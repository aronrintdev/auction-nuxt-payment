#!/bin/bash
sudo mkdir /var/app/current
cd /var/app/current
sudo cp -R /var/app/staging/* /var/app/current -f