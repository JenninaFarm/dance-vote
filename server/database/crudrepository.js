const { pool } = require('./config');

const connectionFunctions = {
  findAllUsers: (query) => {
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
}

module.exports = connectionFunctions;