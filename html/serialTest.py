#!/usr/bin/env python3
import serial
if __name__ == '__main__':
    ser = serial.Serial('/dev/ttyS0', 115200, timeout=1)
    
    ser.write(('ru' + "\n").encode())
    
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            print(line)