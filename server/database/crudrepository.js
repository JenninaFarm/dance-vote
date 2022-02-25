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
      pool.query('INSERT INTO polls (owner_id, name, access_code) VALUES ($1, $2, $3) RETURNING poll_id', [poll.owner_id, poll.name, poll.access_code], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getPollsByOwner: (owner) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM polls WHERE owner_id = $1', [owner], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  },

  getOnGoingPollsByOwner: (owner) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM polls WHERE owner_id = $1 AND on_going = true', [owner], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  },

  getOnGoingPollByAccessCode: (access_code) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM polls WHERE access_code = $1 AND on_going = true', [access_code], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  },

  setPollAccesCode: (poll_id, access_code) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE polls SET access_code = $1 WHERE poll_id = $2', [access_code, poll_id], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  },

  createPollItem: (pollItem) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO poll_items (poll_id, leader, follower) VALUES ($1, $2, $3) RETURNING poll_id', [pollItem.poll_id, pollItem.leader, pollItem.follower], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getPollItemsByPollId: (poll_id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM poll_items WHERE poll_id = $1', [poll_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  },
}

module.exports = connectionFunctions;
