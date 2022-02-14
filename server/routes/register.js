const express = require('express');
const crud = require('../database/crudrepository');

const route = express.Router();

route.post('/', async (req, res) => {

  const existingUser = await crud.getUserByEmail(req.body.email);
  console.log(existingUser.rows);

  try {
    const result = await crud.getUserByEmail(req.body.email);
    res.status(200).json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;