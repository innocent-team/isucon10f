#! /bin/bash

cd `dirname $0`

set -ex

sudo systemctl stop varnish.service
# sudo systemctl stop mysql.service
pushd golang
make
popd
# sudo systemctl start mysql.service
sudo systemctl start varnish.service

sudo systemctl restart xsuportal-web-golang.service
