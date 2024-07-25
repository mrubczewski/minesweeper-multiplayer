import { WebSocketServer } from 'ws'

const PORT = 8080

const wss = new WebSocketServer({ port: PORT })

wss.on('connection', function connection(ws) {
    console.log('Client connected')

    ws.on('error', console.error)

    ws.on('message', function message(data) {
        console.log('received: %s', data)
    })

    ws.send('something')
})

console.log(`Websocket server, port: ${PORT}`)
