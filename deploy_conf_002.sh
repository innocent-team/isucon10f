#! /bin/bash

cd $(dirname $0)

pwd 

set -ex

sudo cp -a ./conf/varnish/default.vcl /etc/varnish/default.vcl
sudo systemctl restart varnish
