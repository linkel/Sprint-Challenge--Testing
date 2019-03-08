const express = require('express');

const games = require('./data/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'online' });
});

server.get('/games', async (req, res) => {
  const rows = await games.getAll();
  console.log(rows);
  res.status(200).json(rows);
});

server.post('/games', async (req, res) => {
  const game = req.body
  if (!game.name || !game.genre) {
    res.status(422).json({message: "Please include name and genre in req.body"})
  } else {
    const send = await games.insert(game)
    console.log(send)
    res.status(201).json(send)
  }
})

module.exports = server;