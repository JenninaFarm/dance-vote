const express = require('express');
const crud = require('../database/crudrepository');
const HttpStatus = require('../HttpStatus');

const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const result = await crud.getPollsByOwner(req.query.id);
    res.status(HttpStatus.OK).json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

route.post('/', async (req, res) => {
  try {
    const result = await crud.createPoll(req.body);
    res.status(HttpStatus.CREATED).json(result);
  } catch (err) {
    res.send(err);
  }
});

route.patch('/access-code', async (req, res) => {
  try {
    const result = await crud.setPollAccesCode(req.body.poll_id, req.body.access_code);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;