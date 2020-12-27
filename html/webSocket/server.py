#!/usr/bin/env pythonpy

# WS server example that synchronizes state across clients

import ThxSocket
import asyncio
import ArduinoSerialCom

arduino = ArduinoSerialCom.ArduinoSerialCom()
thx1138 = ThxSocket.ThxSocket(arduino)

async def main(loop):
    socket = thx1138.getSocket()
    arduinoReadTask = loop.create_task(thx1138.startArduinoReadLoop())
    await socket
    await arduinoReadTask
    

#start_server = websockets.serve(counter, hostname, port)
loop = asyncio.get_event_loop()
loop.run_until_complete(main(loop))
loop.close()