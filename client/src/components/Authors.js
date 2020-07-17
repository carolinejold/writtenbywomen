import React, { Component } from 'react';

class Authors extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/authors')
      .then(res => res.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    const authorArray = this.state.data.map((author, index) => {
      let cleanAuthor;
      let authorImg;
      if (author.bio !== undefined) {
        cleanAuthor = author.bio.replace(/(<([^>]+)>)/ig, '');
      }
      if (author.bio === undefined || author.bio === '' || !author.bio) {
        cleanAuthor = 'Sorry, there is no biography available for this author, but be sure to check out her articles instead!';
      }
      if (!author.bylineImageUrl) {
        authorImg = 'http://sheleadsafrica.com/wp-content/uploads/2016/03/image-placeholder-female.png';
      }
      if (author.bylineImageUrl) {
        authorImg = author.bylineImageUrl;
      }

      return (
        <li className="author-child" key={index}>
          <h4 className="author-name author-child__child">{author.webTitle}</h4>
          <img className="author-img author-child__child" src={authorImg}></img>
          <a href={author.webUrl} target="_blank" className="author-link author-child__child">Browse articles</a>
          <p className="author-description author-child__child">{cleanAuthor}</p>
        </li>
      );
    });

    return (
      <div className="author-container">
        {authorArray}
      </div>
    );
  }
}

export default Authors;
