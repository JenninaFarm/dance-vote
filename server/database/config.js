const { Pool } = require('pg');
require("dotenv").config();

const isProduction = process.env.NODE_ENV === 'production';

//heroku config:get DATABASE_URL -a dance-vote
const connectionString = 'postgres://gwxaojjouknjit:209d859cb9d534b2799b795ed9a6d6785e452aeb3129ece22d10de9e1b56934a@ec2-54-228-9-90.eu-west-1.compute.amazonaws.com:5432/dvtcv196tr2b3';

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = { pool };
