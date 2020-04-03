const express = require('express');

const auth = require('../middleware/auth');

const Message = require('../models/Message');

const router = express.Router();

router.get('/', async (req, res) => {
    const messages = await Message.find();
    res.send(messages);
});

router.post('/', auth, async (req, res) => {
    const messageData = req.body;
    messageData.text = req.body.text;
    messageData.username = req.user.username;

    const message = new Message(messageData);

    try {
        await message.save();
        return res.send(message);
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;