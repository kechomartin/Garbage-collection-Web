// server.js (Node.js with Express)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Install with: npm install express body-parser cors ws

// For real-time updates (WebSockets)
const WebSocket = require('ws');
const http = require('http');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for local development
app.use(bodyParser.json());
app.use(express.static('public')); // Assuming your frontend files are in a 'public' directory

// In-memory store for agent locations (for simplicity, use a database in production)
const agents = {
    'agent1': { id: 'agent1', name: 'Agent John', lat: -1.2950, lng: 36.8200, status: 'available' },
    'agent2': { id: 'agent2', name: 'Agent Jane', lat: -1.2700, lng: 36.8000, status: 'busy' },
    // More agents...
};

// In-memory store for user locations (if agents need to see users)
const users = {}; // userId: { lat, lng, lastUpdated, sharedLocation: boolean }

// API to get all nearby agents
app.get('/api/agents/nearby', (req, res) => {
    // In a real app, you might filter agents by proximity to the request's location
    res.json(Object.values(agents));
});

// API for agents to update their location (simulated for now)
app.post('/api/agent/:id/location', (req, res) => {
    const agentId = req.params.id;
    const { lat, lng, status } = req.body;

    if (agents[agentId]) {
        agents[agentId].lat = lat;
        agents[agentId].lng = lng;
        if (status) agents[agentId].status = status;

        // Broadcast updated agent location to connected clients via WebSocket
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: 'agentUpdate',
                    agent: agents[agentId]
                }));
            }
        });

        res.json({ message: 'Agent location updated', agent: agents[agentId] });
    } else {
        res.status(404).json({ message: 'Agent not found' });
    }
});

// API for users to share their location (optional, for agents to see users)
app.post('/api/user/location', (req, res) => {
    const userId = req.body.userId || 'guest'; // In a real app, use actual user IDs
    const { latitude, longitude, share } = req.body;

    users[userId] = {
        lat: latitude,
        lng: longitude,
        lastUpdated: new Date(),
        sharedLocation: share
    };

    // Optionally broadcast user location to specific agents or all for testing
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'userLocationUpdate',
                user: { id: userId, lat: latitude, lng: longitude, shared: share }
            }));
        }
    });

    res.json({ message: 'User location received' });
});


// Set up WebSocket server for real-time updates
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('Client connected to WebSocket');
    // On connection, send all current agents to the new client
    ws.send(JSON.stringify({
        type: 'allAgents',
        agents: Object.values(agents)
    }));

    ws.on('message', message => {
        console.log('Received:', message.toString());
        // Handle incoming messages from clients (e.g., agent sending its location)
        // You would parse the message and update 'agents' object, then broadcast
    });

    ws.on('close', () => {
        console.log('Client disconnected from WebSocket');
    });

    ws.onerror = error => {
        console.error('WebSocket error:', error);
    };
});


server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    console.log(`WebSocket server running on ws://localhost:${port}/ws`);
});