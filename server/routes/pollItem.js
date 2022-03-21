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

route.get('/id', async (req, res) => {
  try {
    const result = await crud.getPollItemById(req.query.id);
    res.status(HttpStatus.OK).json(result.rows[0]);
  } catch (err) {
    res.send(err);
  }
});

route.patch('/pair', async (req, res) => {
  try {
    const result = await crud.setPairByPollItemId(req.body);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    res.send(err);
  }
});

route.post('/', async (req, res) => {
  try {
    const result = await crud.createPollItem(req.body);
    req.body.poll_item_id = result.rows[0].poll_item_id;
    req.io.sockets.emit('poll-update', req.body);
    res.status(HttpStatus.CREATED).json(result);
  } catch (err) {
    res.send(err);
  }
});


module.exports = route;