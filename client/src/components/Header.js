import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                <h1 className="header-title">Written by Women</h1>
                <h3 className="header-description">Supporting female tech journalists via <a href="https://www.theguardian.com/world">The Guardian</a>.</h3>
            </div>
        )
    }
}

export default Header;
