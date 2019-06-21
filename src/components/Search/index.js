import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { fetchPosts, reset } from '../../store/actions';
import './Search.scss';

class Search extends Component {
  contructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  getAnswer = debounce((query) => {
    if (query !== this.props.query) {
      this.props.reset();
    }
    this.setState({ query });
    if (this.state.query) {
     this.props.fetchPosts(this.state.query);
    }
  }, 500);

  render() {
    const loadingStatus = this.props.loading ? 'Загружаю...': '<div style="visibility:hidden">text</div>';
    return (
      <div className="search">
        <input type="text"
          autoFocus={true}
          className="search__input"
          placeholder="Поиск"
          onChange={e => this.getAnswer(e.target.value)}
        />
        <p className="search__status" dangerouslySetInnerHTML={{__html: loadingStatus}}></p>
      </div>
    );
  }
}

Search.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loading: state.posts.loading,
  query: state.posts.query
});

export default connect(mapStateToProps, { fetchPosts, reset })(Search);
