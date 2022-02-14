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
}

module.exports = connectionFunctions;