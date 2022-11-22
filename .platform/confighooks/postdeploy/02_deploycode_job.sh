#!/bin/bash
cd /var/app/current
npm install @nuxt/bridge-edge@3.0.0-27272804.ca557e7
npm install nuxt3@^3.0.0-rc.9-27703329.537338f -g
npm run generate
node_modules/pm2/bin/pm2 delete index
npm run start