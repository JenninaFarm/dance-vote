const express = require('express');
const crud = require('../database/crudrepository');

const route = express.Router();

route.get('/', (req, res) => {
  try {
    res.status(200).json({message: "hello from server"});
  } catch (err) {
    res.send(err);
  }
});

route.get('/users', async (req, res) => {
  const query = req.query;
  try {
    const result = await crud.findAllUsers(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;