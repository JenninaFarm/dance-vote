const express = require('express');
const crud = require('../database/crudrepository');
const HttpStatus = require('../HttpStatus');
const { confirmPassword } = require('../crypt');

const route = express.Router();

route.patch('/', async (req, res) => {
  try {
    const {email, password} = req.body;
    const response = await crud.getUserByEmail(email);
    const user = response.rows[0];

    if (user) {
      const isMatch = await confirmPassword(password, user.password);
      if (isMatch) {
        try {
          await crud.setLastLogin(user);
        } catch (err) {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: 'Login not updated'});
        }
        return res.status(HttpStatus.OK).json(user);
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error:'Wrong email or password.' });
      }
    }
    return res.status(HttpStatus.OK).json(user);

  } catch (err) {
    console.log(err);
  }
});

module.exports = route;