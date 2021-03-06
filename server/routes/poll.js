const express = require('express');
const crud = require('../database/crudrepository');
const { createUniqueId, countVotes, resultsInPostgre, arrayOfObjectsTo2DArray } = require('../HelperFunctions');
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

route.get('/poll-id', async (req, res) => {
  try {
    const result = await crud.getPollById(req.query.id);
    res.status(HttpStatus.OK).json(result.rows[0]);
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
    const accessCode = createUniqueId(result.rows[0].poll_id);
    const result2 = await crud.setPollAccesCode(result.rows[0].poll_id, accessCode);
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

route.patch('/name', async (req, res) => {
  try {
    const result = await crud.setPollNameById(req.body.id, req.body.name);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    res.send(err);
  }
});

route.patch('/item-amount', async (req, res) => {
  try {
    const result = await crud.setPollItemAmountById(req.body.id, req.body.item_amount);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    res.send(err);
  }
});

route.patch('/end', async (req, res) => {
  try {
    const result = await crud.setPollGoneById(req.body.poll_id);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    res.send(err);
  }
});

route.patch('/publish', async (req, res) => {
  try {
    
    const result = await crud.setPollPublicById(req.body);
    const result2 = await crud.setPollGoneById(req.body);
    const votes = await crud.getVotesByPollId(req.body.id);
    const votesIn2dArray = arrayOfObjectsTo2DArray(votes.rows);
    const placements = countVotes(votesIn2dArray);
    const placementsInPostgre = resultsInPostgre(placements);
    const result3 = await crud.createResult(req.body.id, placementsInPostgre);

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

route.get('/item-amount', async (req, res) => {
  try {
    const result = await crud.getPollItemAmountByPollId(req.query.poll_id);
    res.status(HttpStatus.OK).json(result.rows[0]);
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;