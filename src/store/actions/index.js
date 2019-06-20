import axios from 'axios';
import { FETCH_POSTS, RESET } from './types';

export const reset = () => (dispatch) => {
  dispatch({
    type: RESET,
    payload: {},
  });
};

export const fetchPosts = (query, page = 1) => (dispatch) => {
  dispatch({
    type: FETCH_POSTS,
    payload: {
      posts: [],
      loading: true,
      query,
      totalCount: -1,
    },
  });
  axios.get(`https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=10`)
    .then(res => res.data)
    .then((posts) => {
      dispatch({
        type: FETCH_POSTS,
        payload: {
          posts: posts.items,
          loading: false,
          query,
          totalCount: parseInt(posts.total_count, 10),
        },
      });
    }).catch((error) => {
      console.log(error);
    });
};
