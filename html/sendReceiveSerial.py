#!/usr/bin/env python3

import serial
import time
start = int(round(time.time() * 1000))
print ("start " + str(start - int(round(time.time() * 1000))))

ser = serial.Serial('/dev/serial0', 57600, timeout = 0.1)
print ("serial initialised " + str(start - int(round(time.time() * 1000))))

ser.write("lights ru\n".encode())
print ("written " + str(start - int(round(time.time() * 1000))))

output = ""
response = ser.readlines()
print ("got response " + str(start - int(round(time.time() * 1000))))
for line in response:
    output += line.decode('utf-8')
    print(line.decode('utf-8'))
    #response = ser.readline()
    print ("got response next " + str(start - int(round(time.time() * 1000))))
    
    
ser.close()    
print("exit " + str(start - int(round(time.time() * 1000))))
exit(output)

