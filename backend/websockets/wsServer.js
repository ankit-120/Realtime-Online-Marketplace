import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { wss } from "../app.js";

export function setupWebSocketServer(highestBid) {
    // const wss = new WebSocketServer({ server });

    // const clients = new Set();

    // wss.on("connection", (ws) => {
    //     console.log("Client connected ");
    //     clients.add(ws);

    //     ws.on("close", () => {
    //         console.log("Client disconnected ");
    //         clients.delete(ws);
    //     });

    //     ws.on("message", (message) => {
    //         for (const client of clients) {
    //             if (client !== ws) {
    //                 client.send(`${message}`);
    //             }
    //         }
    //     });
    // });

    // let highestBid = 0;

    wss.on("connection", (ws, req) => {
        console.log("c1 connect");
        // clients.add(ws);

        //authentication
        const isAuthenticated = authenticateClient(req);
        if (!isAuthenticated) {
            console.log("not authenticated");
            ws.close();
            console.log("Connection rejected: Unauthorized");
            return;
        }

        // Send the current highest bid to the new client.
        ws.send(JSON.stringify({ type: "highest-bid", value: highestBid }));

        ws.on("message", (message) => {
            const data = JSON.parse(message);
            console.log(data);

            if (data.type === "place-bid") {
                console.log(data);
                // Handle the new bid and update the highestBid if needed.
                const newBid = parseInt(data.value);
                if (newBid > highestBid) {
                    highestBid = newBid;
                    // Broadcast the new highest bid to all clients.
                    console.log("clients sixe ", wss.clients.size);
                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            console.log("send");
                            client.send(
                                JSON.stringify({
                                    type: "highest-bid",
                                    value: highestBid,
                                    bidder: data.bidder,
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

const authenticateClient = (req) => {
    try {
        const token = req.headers.cookie.substring(6);
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default setupWebSocketServer;
