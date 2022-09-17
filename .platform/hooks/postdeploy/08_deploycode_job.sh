#!/bin/bash
cd /var/app/current
sudo /opt/elasticbeanstalk/bin/get-config optionsettings | jq '."aws:elasticbeanstalk:application:environment"' | jq -r 'to_entries | .[] | "\(.key)=\(.value)"' > /var/app/current/.env