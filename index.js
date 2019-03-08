const express = require('express');

const games = require('./data/gamesModel.spec.js/index.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'online' });
});

server.get('/games', async (req, res) => {
  const rows = await games.getAll();

  res.status(200).json(rows);
});

module.exports = server;