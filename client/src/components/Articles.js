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
    console.log('THIS IS THE STATE', this.state);
  }

  render () {
    return (
      <div>
        <p>I am the Articles component</p>
        <p>{JSON.stringify(this.state)}</p>
            {/* {this.state.data.map(data => 
                <li key='1'> 
                    { data }
                </li>)} */}
      </div>
    );
  }
}

export default Articles;
