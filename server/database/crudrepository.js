const { pool } = require('./config');

const connectionFunctions = {
  findAllUsers: () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users', (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  setLastLogin: (user) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE users SET last_login = now() WHERE email = $1', [user.email], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  },

  createUser: (user) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', user, (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  createPoll: (poll) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO polls (owner_id, name, access_code) VALUES ($1, $2, $3)', [poll.owner_id, poll.name, poll.access_code], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
}

module.exports = connectionFunctions;
