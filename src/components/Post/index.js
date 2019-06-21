import React from 'react';
import './Post.scss';

const Post = (props) => {
    const title = props.post.full_name;
    const url = props.post.html_url;
    const countStars = props.post.stargazers_count;
    const countSubs = props.post.watchers_count;
    const description = props.post.description;

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

export default Post;
