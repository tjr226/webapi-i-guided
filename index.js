const express = require('express');

const server = express();

const Hubs = require('./data/hubs-model.js');

server.use(express.json());  // needed to parse JSON in POST requests


server.get('/', (req, res) => {
    res.send('Hello Web 20');
})

server.get('/hubs', function (req, res) {
    Hubs
        .find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

server.post('/hubs', (req, res) => {
    const hubInfo = req.body;
    console.log(hubInfo);

    Hubs.add(hubInfo)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

server.delete('/hubs/:id', (req, res) => {
    const { id } = req.params;

    Hubs.remove(id).then(deleted => {
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "can't find that hub" })
        }
    })
        .catch(error => {
            res.status(500).json(error);
        })
})

server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Hubs.update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({ message: "can't find that hub" })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
})


const port = 5000;
server.listen(port, () => console.log(`running on port ${port}`));

