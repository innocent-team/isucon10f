#! /bin/bash

sudo systemctl enable --now mysql.service
sudo systemctl disable --now nginx.service
sudo systemctl disable --now envoy.service
sudo systemctl disable --now xsuportal-web-golang.service
sudo systemctl disable --now xsuportal-api-golang.service

