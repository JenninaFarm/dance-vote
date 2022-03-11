const express = require('express');
const crud = require('../database/crudrepository');
const { createUniqueId } = require('../HelperFunctions');
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

route.get('/on-going', async (req, res) => {
  try {
    const result = await crud.getOnGoingPollsByOwner(req.query.id);
    res.status(HttpStatus.OK).json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

route.get('/gone', async (req, res) => {
  try {
    const result = await crud.getGonePollsById(req.query.id);
    res.status(HttpStatus.OK).json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

route.get('/on-going/access-code', async (req, res) => {
  try {
    const result = await crud.getOnGoingPollByAccessCode(req.query.access_code);
    res.status(HttpStatus.OK).json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

route.post('/', async (req, res) => {
  try {
    const result = await crud.createPoll(req.body);
    console.log(result.rows[0].poll_id);
    const accessCode = createUniqueId(result.rows[0].poll_id);
    console.log(accessCode);
    const result2 = await crud.setPollAccesCode(result.rows[0].poll_id, accessCode);
    console.log(result2);
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

route.patch('/publish', async (req, res) => {
  try {
    const result = await crud.setPollPublicById(req.body);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    res.send(err);
  }
});

route.get('/access-code', async (req, res) => {
  try {
    const result = await crud.getAccessCodeByPollId(req.query.poll_id);
    res.status(HttpStatus.OK).json(result.rows);
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;