#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import json
import logging
import websockets

logging.basicConfig()

STATE = {"value": 0}

USERS = set()

try:
    configs = {}
    f =  open('../config.json')
    configs = json.loads(f.read())
    f.close()
    hostname = configs["websocket"]["host"]
    port = configs["websocket"]["port"]
except:
    raise Exception("you must websocket.host & port in config.json")


async def processMessage(request):
    if USERS:  # asyncio.wait doesn't accept an empty list
        response = request(request)
        await asyncio.wait([user.send(message) for user in USERS])

def request(request):
    print(request)
    return json.dumps({"type": "response", "requestId": request.id})

async def serialReceive():
    message = json.dumps({"type": "statusReport", "payload": "payload"})
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = message
        await asyncio.wait([user.send(message) for user in USERS])

async def register(websocket):
    USERS.add(websocket)
    await serialReceive()

async def unregister(websocket):
    USERS.remove(websocket)
    await serialReceive()

async def onMessage(websocket, path):
    # register(websocket) sends user_event() to websocket
    print('onMessage')
    await register(websocket)
    try:
        async for message in websocket:
            print('message')
            print(message)
            data = json.loads(message)
            processMessage(message)
    finally:
        await unregister(websocket)

start_server = websockets.serve(onMessage, hostname, port)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()