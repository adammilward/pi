#!/usr/bin/env python

# WS server example that synchronizes state across clients

import asyncio
import json
import logging
import websockets

logging.basicConfig()
STATE = {"value": 0}

USERS = set()


def state_event():
    return json.dumps({"type": "state", **STATE})


def users_event():
    return json.dumps({"type": "users", "count": len(USERS)})


async def notify_state():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = state_event()
        await asyncio.wait([user.send(message) for user in USERS])


async def notify_users():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = users_event()
        await asyncio.wait([user.send(message) for user in USERS])


async def register(websocket):
    USERS.add(websocket)
    await notify_users()


async def unregister(websocket):
    USERS.remove(websocket)
    await notify_users()

# this is called each time a client is added
async def counter(websocket, path):
    print('registering')
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        print('trying')
        await websocket.send(state_event())
        async for message in websocket:
            print('message')
            print(message)
            data = json.loads(message)
            if data["action"] == "minus":
                STATE["value"] -= 1
                await notify_state()
            elif data["action"] == "plus":
                STATE["value"] += 1
                await notify_state()
            else:
                logging.error("unsupported event: {}", data)
    finally:
        print('unregisteriong')
        await unregister(websocket)


start_server = websockets.serve(counter, "thx1138-dev", 1138)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()