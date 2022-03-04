const express = require('express');
const path = require('path');
const app = express();
const api = express.Router();
const http = require('http');
const cors = require('cors');
const whitelist = ['https://dance-vote.herokuapp.com/', 'https://www.yoursite.com', 'http://127.0.0.1:3500', 'http://localhost:3000'];
const corsOptions = {
  origin: whitelist,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const server = http.createServer(app);

const PORT = process.env.PORT || 3500;


const {Server} = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: whitelist,
    methods: ['GET', 'POST'],
    credentials: true,
  },
  allowEIO4: true,
  transports: ["websocket", "polling"],
});

io.on('connection', (socket) => {
  console.log('a user connected');
})

// give io to all the routes
api.use((req,res,next) => {
  req.io = io;
  next();
});




const register = require('./routes/register');
const login = require('./routes/login');
const poll = require('./routes/poll');
const pollItem = require('./routes/pollItem');


// public routes
api.use('/register', register);
api.use('/login', login);
// needs authentication
api.use('/poll', poll);
api.use('/poll-item', pollItem);


// const { logger } = require('./middleware/logEvents');
// const errorHandler = require('./middleware/errorHandler');
// const poll = require('./routes/poll');


// // custom middleware logger
// app.use(logger);

// // cross origin resource sharing

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api', api);

// all other get requests not handled before will return React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

// // Error handling
// app.use(errorHandler);


server.listen(PORT, () => console.log(`app running on port: ${PORT}`));
