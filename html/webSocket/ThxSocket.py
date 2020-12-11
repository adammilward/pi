import json
import asyncio
import websockets
import logging
import time

class ThxSocket:

    STATE = {"value": 0}
    USERS = set()
    hostname = ''
    port = ''
    arduinoCom = object

    def __init__(self, arduino):
        self.arduinoCom = arduino
        try:
            configs = {}
            f =  open('../config.json')
            configs = json.loads(f.read())
            f.close()
            self.hostname = configs["websocket"]["host"]
            self.port = configs["websocket"]["port"]
        except:
            raise Exception("you must websocket.host & port in config.json")

    async def startArduinoReadLoop(self):
        while True:
            await self.arduinoRead()            
            await asyncio.sleep(10)

    async def arduinoRead(self):
        message = self.arduinoCom.read()
        if (len(message)):
            await self.sendData(message)

    async def arduinoSend(self, request):
        print('socket.arduinoSend', request)
        self.arduinoCom.writeLine(request)
        await self.arduinoRead()

    async def sendData(self, data):
        print('sendData: ', data)
        message = json.dumps(data)
        if self.USERS:  # asyncio.wait doesn't accept an empty list
            await asyncio.wait([user.send(message) for user in self.USERS])
            #print('sent messgage: ', message)

    async def register(self, websocket):
        print('register')
        self.USERS.add(websocket)
        await self.notify_users()

    def state_event(self):
        print('state_event')
        return json.dumps({"type": "state", **self.STATE})

    async def notify_state(self):
        time.sleep(.5)
        print('notify_state')
        if self.USERS:  # asyncio.wait doesn't accept an empty list
            message = self.state_event()
            await asyncio.wait([user.send(message) for user in self.USERS])

    async def unregister(self, websocket):
        print('unregister')
        self.USERS.remove(websocket)
        await self.notify_users()

    async def notify_users(self):   
        print('notify_users')
        if self.USERS:  # asyncio.wait doesn't accept an empty list
            message = json.dumps({"type": "users", "count": len(self.USERS)})
            await asyncio.wait([user.send(message) for user in self.USERS])

    async def counter(self, websocket, path):
        print('counter')
        # register(websocket) sends user_event() to websocket
        print('call retister')
        await self.register(websocket)
        try:
            print('websocket.send(state_event())')
            #await websocket.send(thx1138.state_event()) # sends state info to current websocket
            async for message in websocket: # when websocket receives a message this loop runs
                print('message: ', message)
                data = json.loads(message)
                if data["action"] == "minus":
                    self.STATE["value"] -= 1
                    await self.notify_state() # notify all users of new state
                elif data["action"] == "plus":
                    self.STATE["value"] += 1
                    await self.notify_state() # notify all users of new state
                elif data['action'] == 'arduinoRequest':
                    await self.arduinoSend(data['request'])
                else:
                    logging.error("unsupported event: {}", data)
                print('end for message loop')
            print('after for message loop')
        finally:
            print('unregister')
            await self.unregister(websocket)

    def getSocket(self):
        return websockets.serve(self.counter, self.hostname, self.port)




# def users_event():
#     print('users_event')
#     return json.dumps({"type": "users", "count": len(USERS)})


# async def sendMessage(message):
#     print('sendMessage: ', message)
#     if USERS:  # asyncio.wait doesn't accept an empty list
#         await asyncio.wait([user.send(message) for user in USERS])
#         print('sent messgage: ', message)

# async def notify_users():
#     print('notify_users')
#     if USERS:  # asyncio.wait doesn't accept an empty list
#         message = users_event()
#         await asyncio.wait([user.send(message) for user in USERS])


# async def register(websocket):
#     print('register')
#     USERS.add(websocket)
#     await notify_users()


# async def unregister(websocket):
#     print('unregister')
#     USERS.remove(websocket)
#     await notify_users()
