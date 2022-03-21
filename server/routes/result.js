const express = require('express');
const crud = require('../database/crudrepository');
const HttpStatus = require('../HttpStatus');

const route = express.Router();

route.get('/', async (req, res) => {
  try {
    const result = await crud.getResultByPollId(req.query.poll_id);
    res.status(HttpStatus.OK).json(result.rows[0].result_array);
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;