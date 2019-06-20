import React, { Component } from 'react';
import './Post.scss';

class Post extends Component {
  render() {
    const title = this.props.post.full_name;
    const url = this.props.post.html_url;
    const countStars = this.props.post.stargazers_count;
    const countSubs = this.props.post.watchers_count;
    const description = this.props.post.description;

    return (
      <div className="post">
        <h3 className="post__title">
          <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
        </h3>
        <p className="post__text">{description}</p>
        <p className="post__count-stars">
Звезд
          <span className="post__counter">{countStars}</span>
        </p>
        <p className="post__count-subs">
Подписчиков
          <span className="post__counter">{countSubs}</span>
        </p>
      </div>
    );
  }
}

export default Post;
