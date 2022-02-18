const express = require('express');
const crud = require('../database/crudrepository');
const HttpStatus = require('../HttpStatus');

const route = express.Router();

route.get('/', (req, res) => {
  try {
    res.status(200).json({message: "hello from server"});
  } catch (err) {
    res.send(err);
  }
});

route.post('/', async (req, res) => {
  try {
    const result = await crud.createPoll(req.body);
    res.status(HttpStatus.CREATED).json(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }

});

module.exports = route;