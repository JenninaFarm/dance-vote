const express = require('express');
const crud = require('../database/crudrepository');
const HttpStatus = require('../HttpStatus');

const route = express.Router();

route.get('/poll-id', async (req, res) => {
  try {
    const result = await crud.getPollItemsByPollId(req.query.poll_id);
    res.status(HttpStatus.OK).json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

route.post('/', async (req, res) => {
  try {
    const result = await crud.createPollItem(req.body);
    req.io.sockets.emit('poll-update', req.body);
    res.status(HttpStatus.CREATED).json(result);
  } catch (err) {
    res.send(err);
  }
});


module.exports = route;