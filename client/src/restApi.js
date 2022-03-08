import axios from 'axios';

const HEROKU_URL = "https://dance-vote.herokuapp.com";
const LOCAL_URL = "http://localhost:8080";

// Set to true to use server running on Heroku
const useHeroku = HEROKU_URL.includes(window.location.hostname);

export const ENDPOINT = useHeroku ? HEROKU_URL : 'ws://localhost:8080';

export const BASE_URL = useHeroku ? HEROKU_URL + '/api/' : LOCAL_URL + '/api/';

export const client = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  // },
});

export const restApi = {

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

  getOnGoingPollByAccessCode: async (accessCode) => {
    try {
      const res = await client.get('poll/on-going/access-code', {params: {access_code: accessCode}});
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

  getPollItemsByPollId: async (pollId) => {
    try {
      const res = await client.get('poll-item/poll-id', {params: {poll_id: pollId}});
      return res.data;
    } catch (err) {
      return err;
    }
  },

  sendVote: async (votes) => {
    try {
      const res = await client.post('vote/', votes);
      return res.data;
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
  },
}