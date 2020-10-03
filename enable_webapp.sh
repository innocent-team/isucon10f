#! /bin/bash

sudo systemctl disable --now mysql.service
sudo systemctl enable --now nginx.service
sudo systemctl enable --now envoy.service
sudo systemctl enable --now xsuportal-web-golang.service
sudo systemctl enable --now xsuportal-api-golang.service

