import { combineReducers } from 'redux';
import { FETCH_POSTS, RESET } from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  query: '',
  totalCount: -1,
};

function postReducer(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return {
        ...state,
        items: [],
        loading: false,
        query: '',
        totalCount: -1,
      };
    case FETCH_POSTS:
      return {
        ...state,
        items: state.items.concat(action.payload.posts),
        loading: action.payload.loading,
        query: action.payload.query,
        totalCount: action.payload.totalCount,
      };
    default:
      return state;
  }
}

export default combineReducers({
  posts: postReducer,
});
