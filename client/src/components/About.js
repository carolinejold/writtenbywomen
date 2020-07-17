import React, { Component } from 'react'

class About extends Component {
    render() {
        return (
            <div className="about-container">
                <section className="about-description">
                    <h4>ABOUT THIS PAGE</h4>
                    <p>The number of women in tech may be increasing, but there is still a long way to go.</p>
                    <p>Let this page serve as inspiration for ambitious women and girls who are enthused by the technical, scientific and computing sectors, and a place which gives credit to the female journalists touching upon these subjects in fields traditionally dominated by men.</p>
                    <br></br>
                    <h4>HOW WAS THIS SPA CREATED?</h4>
                        <li>1. Filtered through The Guardian's latest articles mentioning tech and computing via the Guardian Open-Platform API</li>
                        <li>2. Used a gender detection npm package to detect female names</li>
                        <li>3. Manipulated the data in Express server in the backend, and sent the data forward to the state object residing in the React frontend</li>
                        <li>4. Rendered the details of the resulting female authors of the articles on this SPA, pulling in their name, photo, biography and a link to their articles</li>
                        <li>5. Finished off with some CSS styling</li>
                </section>
                <br></br>
                <p>Created with love, React & Express by <br></br> <a href="https://www.linkedin.com/in/carolinejold/" target="_blank">Caroline Old</a></p>
            </div>
        )
    }
}

export default About;
