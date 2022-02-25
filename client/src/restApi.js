import axios from 'axios';

const HEROKU_URL = "https://https://dance-vote.herokuapp.com/api/";
const LOCAL_URL = "http://localhost:3500/api/";

// Set to true to use server running on Heroku
const useHeroku = true;

const BASE_URL = useHeroku ? HEROKU_URL : LOCAL_URL;

export const client = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  // },
});

export const restApi = {
  test: async () => {
    try {
      const res = await axios.get('http://localhost:3500/api/');
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  createUser: async (user) => {
    try {
      const res = await client.post('register/', user);
      return res;
    } catch (err) {
      return err.response.data;
    }
  },

  login: async (loginInfo) => {
    try {
      const res = await client.patch('login/', loginInfo);
      return res.data;
    } catch (err) {
      return err;
    }
  },

  createPoll: async (poll) => {
    try {
      const res = await client.post('poll/', poll);
      return res.data.rows[0];
    } catch (err) {
      return err;
    }
  },

  getPollsByOwner: async (owner) => {
    try {
      const res = await client.get('poll/', {params: {id: owner}});
      return res.data;
    } catch (err) {
      return err;
    }
  },

  getOnGoingPollsByOwner: async (owner) => {
    try {
      const res = await client.get('poll/on-going', {params: {id: owner}});
      return res.data;
    } catch (err) {
      return err;
    }
  },

  setPollAccessCode: async (poll) => {
    try {
      const res = await client.patch('poll/access-code', poll);
      return res.data;
    } catch (err) {
      return err;
    }
  },

  createPollItem: async (pollItem) => {
    try {
      const res = await client.post('poll-item/', pollItem);
      return res;
    } catch (err) {
      return err;
    }
  },

  getUsers: async () => {
    try {
      const res = await client.get('users');
      return res.data;
    } catch (err) {
      return(err);
    }
  }
}