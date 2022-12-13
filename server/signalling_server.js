const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 }, () => {
    console.log("Signalling server is now listening on port 8081");
});

const group = {}

wss.broadcast = (ws, data, id) => {
    group[id].forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', (ws, req) => {
    console.log(`Client connected. Total connected clients: ${wss.clients.size}`);
	const id = req.url.replace("/", "")
	console.log("id",id)
	if(!group[id]) {
		group[id] = [ws]
	} else {
		group[id] = [...group[id],ws]
	}

    ws.on('message', message => {
        // msg = JSON.parse(message);
        wss.broadcast(ws, message, id);
    });
    ws.on('close', ws=> {
        console.log(`Client disconnected. Total connected clients: ${wss.clients.size}`);
    })

    ws.on('error', error => {
        console.log(`Client error. Total connected clients: ${wss.clients.size}`);
    });
});
