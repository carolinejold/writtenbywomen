import React, { Component } from 'react';
import './Articles.css';

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/articles')
      .then(res => res.json())
      .then(data => this.setState({ data: data }));
  }

  render() {
    // TODO - return different states from map before using them in the code ie data.webTitle etc.
    // TODO - remove <p> tags etc from bios
    // TODO - stop journalists being repeated
    // TODO - sort keys
    // TODO - refactor class names to make BAME or whatever 
    return (
      <div>
        {this.state.data.map(data =>
          <li className="article-child" key='data.id'>
            <h4>{data.webTitle}</h4>
            <a>{data.webUrl}</a>
            <p> {data.bio} </p>
          </li>)}
      </div>
    );
  }
}

export default Articles;
