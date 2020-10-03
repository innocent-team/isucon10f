#! /bin/bash

cd $(dirname $0)

pwd 

set -ex

sudo cp -a ./conf/envoy/config.yaml /etc/envoy/config.yaml
sudo systemctl restart envoy
#
#sudo cp -a ./conf/mysql/mysql.cnf /etc/mysql/mysql.cnf
#sudo cp -a ./conf/mysql/mysql.conf.d/mysql.cnf /etc/mysql/mysql.conf.d/mysql.cnf
#sudo cp -a ./conf/mysql/mysql.conf.d/mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf
#sudo cp -a ./conf/mysql/conf.d/mysqldump.cnf /etc/mysql/conf.d/mysqldump.cnf
#sudo cp -a ./conf/mysql/conf.d/mysql.cnf /etc/mysql/conf.d/mysql.cnf
#sudo systemctl restart mysql
#
sudo cp -a ./conf/nginx/nginx.conf /etc/nginx/nginx.conf
sudo cp -a ./conf/nginx/sites-available/default /etc/nginx/sites-available/default
sudo nginx -t && sudo systemctl restart nginx
