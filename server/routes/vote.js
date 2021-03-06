const express = require('express');
const crud = require('../database/crudrepository');
const HttpStatus = require('../HttpStatus');

const route = express.Router();

route.post('/', async (req, res) => {
  try {
    const result = await crud.createVote(req.body);
    res.status(HttpStatus.CREATED).json(result);
  } catch (err) {
    res.send(err);
  }
});

route.get('/', async (req, res) => {
  try {
    const result = await crud.getVotesByPollId(req.query.poll_id);
    res.status(HttpStatus.OK).json(result.rows);
  } catch (err) {
    res.send(err);
  }
});


module.exports = route;