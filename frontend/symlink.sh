#! /bin/bash

cd `dirname $0`

set -ex

ln -sf /home/isucon/webapp/frontend/public/audience.html /home/isucon/webapp/frontend/public/index.html
ln -sf /home/isucon/webapp/frontend/public/audience.html /home/isucon/webapp/frontend/public/registration
ln -sf /home/isucon/webapp/frontend/public/audience.html /home/isucon/webapp/frontend/public/signup
ln -sf /home/isucon/webapp/frontend/public/audience.html /home/isucon/webapp/frontend/public/login
ln -sf /home/isucon/webapp/frontend/public/audience.html /home/isucon/webapp/frontend/public/logout
ln -sf /home/isucon/webapp/frontend/public/audience.html /home/isucon/webapp/frontend/public/teams

mkdir -p /home/isucon/webapp/frontend/public/contestant # auto slash required
ln -sf /home/isucon/webapp/frontend/public/contestant.html /home/isucon/webapp/frontend/public/contestant/index.html
# ln -sf /home/isucon/webapp/frontend/public/contestant.html /home/isucon/webapp/frontend/public/contestant/benchmark_jobs # slash
mkdir -p /home/isucon/webapp/frontend/public/contestant/clarifications # auto slash required
ln -sf /home/isucon/webapp/frontend/public/contestant.html /home/isucon/webapp/frontend/public/contestant/clarifications/index.html
mkdir -p /home/isucon/webapp/frontend/public/contestant/benchmark_jobs # auto slash required
ln -sf /home/isucon/webapp/frontend/public/contestant.html /home/isucon/webapp/frontend/public/contestant/benchmark_jobs/index.html # ALL ids
# ln -sf /home/isucon/webapp/frontend/public/contestant.html /home/isucon/webapp/frontend/public/contestant/benchmark_jobs/:id

mkdir -p /home/isucon/webapp/frontend/public/admin # auto slash required
mkdir -p /home/isucon/webapp/frontend/public/admin/clarifications # auto slash required
ln -sf /home/isucon/webapp/frontend/public/admin.html /home/isucon/webapp/frontend/public/admin/index.html
# ln -s slash # /home/isucon/webapp/frontend/public/admin/clarifications # auto slash required
ln -sf /home/isucon/webapp/frontend/public/admin.html /home/isucon/webapp/frontend/public/admin/clarifications/index.html # ALL ids
# ln -s /home/isucon/webapp/frontend/public/admin.html /home/isucon/webapp/frontend/public/admin/clarifications/:id
