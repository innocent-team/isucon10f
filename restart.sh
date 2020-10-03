#! /bin/bash

cd `dirname $0`

set -ex

pushd golang
make
popd

sudo systemctl restart xsuportal-web-golang.service
sudo systemctl restart xsuportal-api-golang.service
