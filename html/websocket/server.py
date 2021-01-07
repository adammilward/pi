#!/usr/bin/env pythonpy

# WS server example that synchronizes state across clients

import ThxSocket
import asyncio
import ArduinoSerialCom
import json

try:
    configs = {}
    f =  open('../config.json')
    configs = json.loads(f.read())
    print(configs)
    f.close()
    hostname = configs["websocket"]["host"]
    port = configs["websocket"]["port"]
    serialPort = configs["serialPort"] if "serialPort" in configs else ''
    baudRate = configs["baudRate"] if "baudRate" in configs else 0
    timeout = configs["timeout"] if "timeout" in configs else 0
except:
    print("you haven't provided all the appropriate parameters in config.json")

arduino = ArduinoSerialCom.ArduinoSerialCom(serialPort, baudRate, timeout)
thx1138 = ThxSocket.ThxSocket(arduino, hostname = hostname, port = port)

async def main(loop):
    socket = thx1138.getSocket()
    arduinoReadTask = loop.create_task(thx1138.startArduinoReadLoop())
    await socket
    await arduinoReadTask
    

#start_server = websockets.serve(counter, hostname, port)
loop = asyncio.get_event_loop()
loop.run_until_complete(main(loop))
loop.close()