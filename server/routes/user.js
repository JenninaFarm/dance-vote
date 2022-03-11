const express = require('express');
const crud = require('../database/crudrepository');
const HttpStatus = require('../HttpStatus');

const route = express.Router();

route.patch('/username', async (req, res) => {
  try {
    const result = await crud.setUsernameById(req.body);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;