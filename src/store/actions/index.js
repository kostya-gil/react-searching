import { FETCH_POSTS } from './types';
import axios from 'axios';

export const fetchPosts = (query, page = 1) => (dispatch) => {
  dispatch({
    type: FETCH_POSTS,
    payload: {
      posts: [],
      loading: true,
      query: query,
      totalCount: -1
    }
  });
  axios.get(`https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=10`)
    .then(res => res.data)
    .then(posts => {
      dispatch({
        type: FETCH_POSTS,
        payload: {
          posts: posts.items,
          loading: false,
          query: query,
          totalCount: parseInt(posts.total_count, 10)
        }
      });
    }
  ).catch(error => {
    dispatch({
      type: FETCH_POSTS,
      payload: {
        posts: [
          {
            id: 'error1',
            full_name: error
          }
        ],
        loading: false,
        query: query,
        totalCount: -1
      }
    });
    console.log(error);
  });
};
