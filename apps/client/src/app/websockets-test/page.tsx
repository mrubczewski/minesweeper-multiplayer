'use client'

import React from 'react'

export default function WebsocketTest() {
    const [messages, setMessages] = React.useState<string[]>([])
    const [input, setInput] = React.useState('')
    const [ws, setWs] = React.useState<WebSocket | null>(null)

    React.useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080')

        socket.onopen = () => {
            console.log('Connected to WebSocket server')
            setWs(socket)
        }

        socket.onmessage = (event) => {
            console.log('Message from server:', event.data)
            setMessages((prevMessages) => [...prevMessages, event.data])
        }

        socket.onclose = () => {
            console.log('WebSocket connection closed')
        }

        socket.onerror = (error) => {
            console.error('WebSocket error:', error)
        }

        return () => {
            socket.close()
        }
    }, [])

    const sendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(input)
            setInput('')
        }
    }

    return (
        <>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send message</button>
            </div>
            <div>
                <h2>Messages</h2>
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}
