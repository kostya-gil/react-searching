import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import Post from '../Post';
import './Posts.scss';

class Posts extends Component {
  infinityScroll = debounce((query) => {
    //
  }, 500);

  render() {
    const resultStatus = (this.props.totalCount === 0 && this.props.query !== undefined) ? 'К сожалению, ничего не найдено...': '';
    const postItems = this.props.posts.map(post => (
      <Post post={post} key={post.id} />
    ));
    return (
      <div className="result" onScroll={e => this.infinityScroll(e.target.value)} >
        {postItems}
        <p className="search__status">{resultStatus}</p>
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  query: state.posts.query,
  totalCount: state.posts.totalCount
});

export default connect(mapStateToProps, null)(Posts);
