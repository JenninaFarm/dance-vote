const express = require('express');
const path = require('path');

const server = express();
const api = express.Router();

const PORT = process.env.PORT || 3500;


const register = require('./routes/register');
const poll = require('./routes/poll');


// public routes
api.use('/register', register);
// needs authentication
api.use('/poll', poll);


const cors = require('cors');
// const { logger } = require('./middleware/logEvents');
// const errorHandler = require('./middleware/errorHandler');
// const poll = require('./routes/poll');


// // custom middleware logger
// server.use(logger);

// // cross origin resource sharing
// const whitelist = ['https://dance-vote-server.herokuapp.com/', 'https://www.yoursite.com', 'http://127.0.0.1:3500', 'http://localhost:5000'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   optionsSuccessStatus: 200
// }

server.use(cors());

server.use(express.json());
server.use(express.static(path.resolve(__dirname, '../client/build')));

// server.use(express.static("build"));

server.use('/api', api);

// all other get requests not handled before will return React app
server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

// // Error handling
// server.use(errorHandler);


server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
