#!/bin/bash
while :
do

sudo killall node
nohup node app.js &
sleep 300
done
