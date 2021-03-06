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

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users WHERE user_id = $1', [id], (err, result) => {
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

  setUsernameById: (user) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE users SET username = $1 WHERE user_id = $2', [user.username, user.id], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  setEmailById: (user) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE users SET email = $1 WHERE user_id = $2', [user.email, user.id], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  setPasswordById: (newPassword, id) => {
    console.log(newPassword);
    return new Promise((resolve, reject) => {
      pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [newPassword, id], (err, result) => {
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
      pool.query('INSERT INTO polls (owner_id, name, number_of_items) VALUES ($1, $2, $3) RETURNING poll_id', [poll.owner_id, poll.name, poll.number_of_pairs], (err, result) => {
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

  getPollById: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM polls WHERE poll_id = $1', [id], (err, result) => {
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

  getGonePollsById: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM polls WHERE owner_id = $1 AND on_going = false', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
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

  setPollNameById: (poll_id, name) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE polls SET name = $1 WHERE poll_id = $2', [name, poll_id], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  },

  setPollItemAmountById: (poll_id, amount) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE polls SET number_of_items = $1 WHERE poll_id = $2', [amount, poll_id], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  },

  setPollPublicById: (poll_id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE polls SET public = $1 WHERE poll_id = $2', [true, poll_id.id], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  },

  setPollGoneById: (poll_id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE polls SET on_going = $1 WHERE poll_id = $2', [false, poll_id.id], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  },

  getAccessCodeByPollId: (poll_id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT access_code FROM polls WHERE poll_id = $1', [poll_id], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  },

  getPollItemAmountByPollId: (poll_id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT number_of_items FROM polls WHERE poll_id = $1', [poll_id], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  },

  createPollItem: (pollItem) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO poll_items (poll_id, leader, follower) VALUES ($1, $2, $3) RETURNING poll_item_id', [pollItem.poll_id, pollItem.leader, pollItem.follower], (err, result) => {
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

  getPollItemById: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM poll_items WHERE poll_item_id = $1', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  },

  setPairByPollItemId: (pair) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE poll_items SET leader = $1, follower = $2 WHERE poll_item_id = $3', [pair.leader, pair.follower, pair.id], (err, result) => {
        if(err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    })
  },

  createVote: (vote) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO votes (poll_id, vote_array) VALUES ($1, $2)', [vote.poll_id, vote.vote], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getVotesByPollId: (poll_id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT vote_array FROM votes WHERE poll_id = $1', [poll_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  createResult: (poll_id, result) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO results (poll_id, result_array) VALUES ($1, $2)', [poll_id, result], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getPublicResults: () => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT result_array FROM results WHERE poll_id IN (SELECT poll_id FROM polls WHERE public = true )', [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getResultByPollId: (poll_id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT result_array FROM results WHERE poll_id = $1', [poll_id], (err, result) => {
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
