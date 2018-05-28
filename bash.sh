#!/bin/bash
while :
do
sleep 1800
sudo killall node
nohup node app.js &
done
