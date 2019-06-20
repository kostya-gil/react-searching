import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../../store/actions';
import Post from '../Post';
import './Posts.scss';

class Posts extends Component {
  state = {
    nextPage: 1
  }

  infinityScroll = debounce((wrapper) => {
    const list = wrapper.firstElementChild;

    let wrapperHeight = wrapper.offsetHeight;
    let listHeight = list.offsetHeight;
    let scrollTop = wrapper.scrollTop;

    let diffHeight = listHeight - wrapperHeight;
    if (diffHeight <= scrollTop && !this.props.loading && scrollTop > 0) {
      this.setState(({ nextPage }) => ({
        nextPage: nextPage + 1
      }));
      this.props.fetchPosts(this.props.query, this.state.nextPage);
    }
  }, 500);

  render() {
    const resultStatus = (this.props.totalCount === 0 && this.props.query !== undefined) ? 'К сожалению, ничего не найдено...': '';
    const postItems = this.props.posts.map(post => (
      <Post post={post} key={post.id} />
    ));
    return (
      <div className="result" onScroll={e => this.infinityScroll(e.target)} >
        <div>
          {postItems}
          <p className="search__status">{resultStatus}</p>
        </div>
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
  totalCount: state.posts.totalCount,
  loading: state.posts.loading
});

export default connect(mapStateToProps, {fetchPosts})(Posts);
