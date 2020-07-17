import React, { Component } from 'react'

class About extends Component {
    render() {
        return (
            <div className="about-container">
                <p className="about-description">
                    We have filtered through The Guardian's latest articles mentioning tech and computing, used a gender detection package to detect female names and displayed the resulting female authors of the articles on this page.
                </p>
            </div>
        )
    }
}

export default About;
