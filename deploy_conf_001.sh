#! /bin/bash

cd $(dirname $0)

pwd 

set -ex

sudo cp -a ./conf/envoy/config.yaml /etc/envoy/config.yaml
sudo systemctl restart envoy
sudo cp -a ./conf/nginx/nginx.conf /etc/nginx/nginx.conf
sudo cp -a ./conf/nginx/sites-available/default /etc/nginx/sites-available/default
sudo nginx -t && sudo systemctl restart nginx
