#!/bin/bash
cd /var/app/current
npm install pm2 -g
npm install
npm install @nuxt/bridge-edge@3.0.0-27272804.ca557e7
npm install nuxt3 -g
npm run build
pm2 delete index
npm run start