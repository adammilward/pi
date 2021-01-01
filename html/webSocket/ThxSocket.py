import json
import asyncio
import websockets
import logging

class ThxSocket:

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
            raise Exception("you must provide websocket.host & port in config.json")

    async def startArduinoReadLoop(self):
        while True:
            await self.arduinoRead()            
            await asyncio.sleep(0.5)

    async def arduinoRead(self):
        messages = self.arduinoCom.read()
        if (len(messages)):
            for message in messages:
                await self.sendData(message)

    async def arduinoSend(self, request):
        self.arduinoCom.writeLine(request)
        await self.arduinoRead()

    async def sendData(self, data):
        message = json.dumps(data)
        if self.USERS:  # asyncio.wait doesn't accept an empty list
            await asyncio.wait([user.send(message) for user in self.USERS])
            #print('sent messgage: ', message)

    async def register(self, websocket):
        self.USERS.add(websocket)
        await self.notify_users()

    async def unregister(self, websocket):
        self.USERS.remove(websocket)
        await self.notify_users()

    async def notify_users(self):   
        if self.USERS:  # asyncio.wait doesn't accept an empty list
            message = json.dumps({
                "type": "users",
                "payload": {"count": len(self.USERS)}
            })
            await asyncio.wait([user.send(message) for user in self.USERS])

    async def counter(self, websocket, path):
        # register(websocket) sends user_event() to websocket
        await self.register(websocket)
        try:
            async for message in websocket: # when websocket receives a message this loop runs
                data = json.loads(message)
                if data['type'] == 'arduinoRequest':
                    await self.arduinoSend(data['payload'])
                elif data['type'] == 'watchdogCheck':
                    await websocket.send(json.dumps({
                            'type': 'watchdogConfirm',
                            'payload': data['payload']
                        }))
                else:
                    logging.error("unsupported event: {}", data)
        finally:
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
