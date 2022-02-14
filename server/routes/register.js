const express = require('express');
const crud = require('../database/crudrepository');
const HttpStatus = require('../HttpStatus');
const { encryptPassword } = require('../crypt');

const route = express.Router();

route.post('/', async (req, res) => {

  const existingUser = await crud.getUserByEmail(req.body.email);

  if (existingUser.rows.length !== 0) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Email is already in use." });
  }

  try {
    const encryptedPassword = await encryptPassword(req.body.password);

    const result = await crud.createUser([req.body.username, encryptedPassword, req.body.email]);
    console.log(result);
    res.status(HttpStatus.CREATED).json(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;