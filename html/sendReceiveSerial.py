#!/usr/bin/env python3
''' to enable serial comunication
    you will need to change stop the pi accessing the serial port,
    by changing somethin in config.txt and cmdline.txt
    
    you will also need to change the permissions on /dev/ttyS0 and /dev/serial0
    to allow the www-data read and write access
''' 

import serial
import time
import sys

output = ""

# timeout = 0.003 seems to work ok, so set it to 0.02 to be safe 0.5 for debug mode
# for reading the volttages atleast 0.07 is needed use 0.1 to be safe
ser = serial.Serial('/dev/serial0', 115200, timeout = 0.1)
ser.flush()
ser.write((sys.argv[1] + "\n").encode())
#ser.write(("report" + "\n").encode())


response = ser.readlines()
for line in response:
    output += line.decode('utf-8')
    print(line.decode('utf-8'))

ser.close()
exit()
