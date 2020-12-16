import json
import asyncio
import websockets

async def hello():
    uri = "ws://thx1138-dev:1138"
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