#!/bin/bash
cd /var/app/current
npm install @nuxt/bridge-edge@3.0.0-27272804.ca557e7
npm install nuxt3 -g
npm run build
node_modules/pm2/bin/pm2 delete index