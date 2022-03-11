const express = require('express');
const { confirmPassword } = require('../crypt');
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

route.patch('/email', async (req, res) => {
  try {
    const result = await crud.setEmailById(req.body);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    res.send(err);
  }
});

route.patch('/password', async (req, res) => {
  const {oldPassword, newPassword, id} = req.body;
  console.log(req.body);
  try {
    const response = await crud.getUserById(id);
    const user = response.rows[0];
    if(user) {
      console.log(user);
      const isMatch = await confirmPassword(oldPassword, user.password);
      console.log(isMatch);
      if(isMatch) {
        try {
          const encryptedPassword = await encryptPassword(newPassword);
          const result = await crud.setPasswordById(encryptedPassword, id);
          return res.status(HttpStatus.OK).json(result);
        } catch (err) {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: 'Password not updated'});
        }
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error:'Wrong password.' });
      }
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error:'Person is not authorized.' });
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = route;