#!/usr/bin/env python3

import serial
import time

output = ""

ser = serial.Serial('/dev/ttyACM0', 57600, timeout = 0.1)
ser.write("lights ru\n".encode())

response = ser.readlines()
for line in response:
    output += line.decode('utf-8')
    print(line.decode('utf-8'))

ser.close()
exit(output)
