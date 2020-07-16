import React, { Component } from 'react';

class Authors extends Component {
  constructor(props) {
    super(props);
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
    // TODO - remove <p> tags etc from bios, or sort this out in another way
    // TODO - stop journalists being repeated
    // TODO - EITHER make sure word "she" appears in bio, or make list of unisex names and disallow them
    // TODO - implement image placeholder for when image and bios not available
    // TODO - refactor class names to make BAME or whatever 
    // TODO - implement search tos earch for topics/name, bring in more data
    
    return (
      <div className="author-container">
        {this.state.data.map((author, index) =>
          <li className="author-child author-child__container" key={index}>
            <h4 className="author-name author-child__child">{author.webTitle}</h4>
            <img className="author-img author-child__child" src={author.bylineImageUrl}></img><br/>
            <a href={author.webUrl} className="author-link author-child__child">Browse {author.webTitle}'s articles</a>
            <p className="author-child__child">{author.bio}</p>
          </li>)}
      </div>
    );
  }
}

export default Authors;
