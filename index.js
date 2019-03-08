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

module.exports = server;