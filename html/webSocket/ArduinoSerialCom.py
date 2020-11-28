# python -m pip install pyserial
import serial
import time
import sys

class ArduinoSerialCom:

    baudRate = 115200

    #timeout = 0.003 seems to work ok, so set it to 0.02 to be safe 0.5 for debug mode
    # for reading the volttages atleast 0.07 is needed use 0.1 to be safe
    timeout = 0.02
    
    arduino = object

    serialPort = '/dev/ttyACM0'

    def __init__(self, timeout  = 0, serialPort = '', baudRate = 0):
        
        self.baudRate = baudRate if baudRate else self.baudRate
        self.timeout = timeout if timeout else self.timeout
        self.serialPort = serialPort if serialPort else self.serialPort

        self.arduino = serial.Serial(self.serialPort, self.baudRate, timeout = self.timeout)
        print(self.timeout, self.serialPort, self.baudRate, self.arduino)

    def write(self, message):
        #time.sleep(0.02)
        self.arduino.write(message.encode());


    def read(self):
        #time.sleep(0.02)
        output = ''
        response = self.arduino.readlines()
        for line in response:
            output += line.decode('utf-8')

        return output


