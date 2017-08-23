#!/bin/bash

clear
echo "Starting game"
X=$( ls -l output/ | grep -v ^d | wc -l )
Y=$(( X - 1 ))
echo "Outputting to output$Y.txt"
node Game_v3.js > output/output$Y.txt
