# python -m pip install pyserial
import serial
import json
import re
import sys
import traceback

class ArduinoSerialCom:

    baudRate = 115200

    #timeout = 0.003 seems to work ok, so set it to 0.02 to be safe 0.5 for debug mode
    # for reading the volttages atleast 0.07 is needed use 0.1 to be safe
    timeout = 0.02
    
    arduino = object

    serialPort = '/dev/serial0'

    def __init__(self, serialPort = '', baudRate = 0,  timeout  = 0):
        
        self.baudRate = baudRate if baudRate else self.baudRate
        self.timeout = timeout if timeout else self.timeout
        self.serialPort = serialPort if serialPort else self.serialPort

        self.arduino = serial.Serial(self.serialPort, self.baudRate, timeout = self.timeout)

    def writeLine(self, message):
        print('arduino.write ', message)
        self.arduino.write((message + '\n').encode());

    def passForJson(self, message):
        result = []  
        strings = re.findall("\<\{(.*?)\}\>", message, re.DOTALL)
        for string in strings:
            try:
                jsonInner = re.sub("\'", '"', string, flags = re.DOTALL)
                result.append(json.loads('{' + jsonInner + '}'))
            except:
                print(traceback.format_exc())
                result.append({
                    'type': 'error',
                    'payload': traceback.format_exc()
                })
        return result

    def read(self):
        responseText = ''
        messages = []

        response = self.arduino.readlines()
        for line in response:
            responseText += line.decode('utf-8')

        if (responseText):
            messages.append({
                    'type': 'raw',
                    'payload': responseText
                 })
            try:
                jsonMessages = self.passForJson(responseText)
                messages += jsonMessages
            except:
                print('json parse failed' , sys.exc_info()[0], sys.exc_info()[1])
               
        return messages


