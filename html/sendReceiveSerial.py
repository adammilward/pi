#!/usr/bin/env python3

import serial
import time
import sys

output = ""

ser = serial.Serial('/dev/serial0', 57600, timeout = 0.1)
ser.write((sys.argv[1] + "\n").encode())

response = ser.readlines()
for line in response:
    output += line.decode('utf-8')
    print(line.decode('utf-8'))

ser.close()
exit()