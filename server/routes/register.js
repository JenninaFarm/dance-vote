const express = require('express');
const crud = require('../database/crudrepository');
const HttpStatus = require('../HttpStatus');

const route = express.Router();

route.post('/', async (req, res) => {

  const existingUser = await crud.getUserByEmail(req.body.email);

  if (existingUser) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Email is already in use." });
  }

  try {
    const result = await crud.getUserByEmail(req.body.email);
    res.status(HttpStatus.OK).json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;