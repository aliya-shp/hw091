const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expressWs = require('express-ws');
const {nanoid} = require('nanoid');

const config = require('./config');
const users = require('./app/users');
const messages = require('./app/messages');
const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
const port = 8000;

expressWs(app);

app.use(express.json());
app.use(cors());

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);
    
    app.use('/users', users);
    app.use('/messages', messages);

    const connections = {};

    app.ws('/chat', async (ws, req) => {
        if (!req.query.token) {
            return ws.close();
        }

        const user = await User.findOne({token: req.query.token});

        if (!user) {
            return ws.close();
        }

        const id = nanoid();

        console.log('client connected with id - ' + id);

        connections[id] = ws;

        console.log('total clients connected ' + Object.keys(connections).length);

        const usernames = Object.keys(connections).map(connId => {
            const connection = connections[connId];
            return connection.user.username;
        });

        ws.send(JSON.stringify({
            type: 'ONLINE_USERS',
            usernames,
        }));

        ws.send(JSON.stringify({
            type: 'LAST_MESSAGES',
            messages: await Message.find().limit(30),
        }));

        let username = user.username;

        ws.on('message', (msg) => {
            console.log(`Incoming message from ${id}: `, msg);

            const parsed = JSON.parse(msg);

            switch (parsed.type) {
                case 'ADD_MESSAGE':
                    Object.keys(connections).forEach(connId => {
                        const connection = connections[connId];
                        const newMessage = {
                            username,
                            text: parsed.text,
                        };

                        connection.send(JSON.stringify({
                            type: 'NEW_MESSAGE',
                            ...newMessage,
                        }));

                        const message = new Message(newMessage);

                        message.save();

                    });
                    break;
                case 'SET_USERNAME':
                    console.log(`User ${id} (${username}) changed to ${parsed.username}`);
                    username = parsed.username;
                    break;
                default:
                    console.log('NO_TYPE: ' + parsed.type);
            }
        });

        ws.on('close', (msg) => {
            console.log(`client disconnected: ${id}`);

            delete connections[id];
        });
    });

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(e => {
    console.error(e);
});

