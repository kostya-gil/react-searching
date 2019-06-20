import { FETCH_POSTS } from '../actions/types';
import { combineReducers } from 'redux';

const initialState = {
  items: [],
  loading: false,
  query: '',
  totalCount: -1
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        items: action.payload.posts,
        loading: action.payload.loading,
        query: action.payload.query,
        totalCount: action.payload.totalCount
      };
    default:
      return state;
  }
}

export default combineReducers({
  posts: postReducer
});
