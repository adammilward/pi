import json
import asyncio
import websockets

configs = {}
f =  open('/var/www/html/config.json')
configs = json.loads(f.read())
f.close()
hostname = configs["websocket"]["host"]
port = configs["websocket"]["port"]
uri = "ws://" + hostname + ":" + port
# uri = "ws://thx1138:1138"

async def hello():
    try:
        async with websockets.connect(uri) as websocket:
            response = await websocket.recv()

            await websocket.send(json.dumps({
                'type': 'watchdogCheck',
                'payload': 'startSocket'
            }))
            
            response = await websocket.recv()
            data = json.loads(response)
            if data['type'] == 'watchdogConfirm':
                if data['payload'] == 'startSocket':
                    print('socket running')
            else:
                print('socket returned wrong response')
    except:
        print('socket connect failed')


asyncio.get_event_loop().run_until_complete(hello())