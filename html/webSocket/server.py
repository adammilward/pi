#!/usr/bin/env python

# WS server example that synchronizes state across clients

import ThxSocket
import asyncio
import ArduinoSerialCom

arduino = ArduinoSerialCom.ArduinoSerialCom()
thx1138 = ThxSocket.ThxSocket()

async def arduinoRead():
    while True:
        message = arduino.read()
        if (len(message)):
            await thx1138.sendData(message)
        
        await asyncio.sleep(1)

async def main(loop):
    socket = thx1138.getSocket()
    arduinoReadTask = loop.create_task(arduinoRead())
    await socket
    await arduinoReadTask
    

#start_server = websockets.serve(counter, hostname, port)
loop = asyncio.get_event_loop()
loop.run_until_complete(main(loop))
loop.close()

