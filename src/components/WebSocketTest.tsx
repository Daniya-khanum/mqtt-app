import React, { useState, useEffect } from 'react';

const WebSocketTest: React.FC = () => {
    const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
    const [messages, setMessages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const url = 'wss://broker.hivemq.com:8884/mqtt'; // Use the correct WebSocket URL
        let ws: WebSocket;

        try {
            ws = new WebSocket(url);

            ws.onopen = () => {
                setConnectionStatus('Connected');
                console.log('WebSocket connection opened');
            };

            ws.onmessage = (event) => {
                console.log('Received message:', event.data);
                setMessages((prevMessages) => [...prevMessages, event.data]);
            };

            ws.onerror = (event) => {
                console.error('WebSocket error:', event);
                setError('WebSocket error occurred');
            };

            ws.onclose = () => {
                setConnectionStatus('Disconnected');
                console.log('WebSocket connection closed');
            };
        } catch (e) {
            console.error('WebSocket exception:', e);
            setError(`WebSocket exception: ${(e as Error).message}`);
        }

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>WebSocket Test</h2>
            <p>Connection Status: {connectionStatus}</p>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <h3>Received Messages:</h3>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketTest;
