import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { fetchPosts } from '../../store/actions';
import './Search.scss';

class Search extends Component {
  state = {
    query: ''
  }

  getAnswer = debounce((query) => {
    this.setState({ query });
    if (this.state.query) {
     this.props.fetchPosts(this.state.query);
    }
  }, 500);

  render() {
    const loadingStatus = this.props.loading ? 'Загружаю...': '';
    return (
      <div className="search">
        <input type="text"
          autoFocus={true}
          className="search__input"
          placeholder="Поиск"
          onChange={e => this.getAnswer(e.target.value)}
        />
        <p className="search__status">{loadingStatus}</p>
      </div>
    );
  }
}

Search.propTypes = {
  fetchPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loading: state.posts.loading
});

export default connect(mapStateToProps, { fetchPosts })(Search);
