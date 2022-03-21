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

  changeUsernameById: async (user) => {
    try {
      const res = await client.patch('user/username', user);
      return res.data;
    } catch (err) {
      return err;
    }
  },

  changeEmailById: async (user) => {
    try {
      const res = await client.patch('user/email', user);
      return res.data;
    } catch (err) {
      return err;
    }
  },

  changePasswordById: async (user) => {
    try {
      const res = await client.patch('user/password', user);
      return res.data;
    } catch (err) {
      return err;
    }
  },

  login: async (loginInfo) => {
    try {
      const res = await client.patch('login/', loginInfo);
      return res.data;
    } catch (err) {
      return err.response.data;
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

  getPollById: async (poll_id) => {
    try {
      const res = await client.get('poll/poll-id', {params: {id: poll_id}});
      return res.data;
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

  getGonePollsById: async (id) => {
    try {
      const res = await client.get('poll/gone', {params: {id: id.user_id}});
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

  setPollNameById: async (poll) => {
    try {
      const res = await client.patch('poll/name', poll);
      return res.data;
    } catch (err) {
      return err;
    }
  },

  setPollPairAmountById: async (poll) => {
    try {
      const res = await client.patch('poll/item-amount', poll);
      return res.data;
    } catch (err) {
      return err;
    }
  },

  setPublishByPollId: async (id) => {
    try {
      const res = await client.patch('poll/publish', id);
      return res.data;
    } catch (err) {
      return err;
    }
  },

  getPollAccessCodeByPollId: async (pollId) => {
    try {
      const res = await client.get('poll/access-code', {params: {poll_id: pollId}});
      return res.data;
    } catch (err) {
      return err;
    }
  },

  getPollItemAmountByPollId: async (pollId) => {
    try {
      const res = await client.get('poll/item-amount', {params: {poll_id: pollId}});
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

  getPollItemById: async (id) => {
    try {
      const res = await client.get('poll-item/id', {params: {id: id}});
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

  getVotesByPollId: async (pollId) => {
    try {
      const res = await client.get('vote/', {params: {poll_id: pollId}});
      return res.data;
    } catch (err) {
      return err;
    }
  },

  getResultsByPollId: async (pollId) => {
    try {
      const res = await client.get('result/', {params: {poll_id: pollId}});
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