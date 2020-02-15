#!/usr/bin/env python3

import serial
import time
import sys

output = ""

# timeout = 0.003 seems to work ok, so set it to 0.02 to be safe 0.5 for debug mode
ser = serial.Serial('/dev/serial0', 57600, timeout = 0.02)
ser.write((sys.argv[1] + "\n").encode())

response = ser.readlines()
for line in response:
    output += line.decode('utf-8')
    print(line.decode('utf-8'))

ser.close()
exit()