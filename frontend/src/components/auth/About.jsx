import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className="about-container">
                <h3>Meet the team</h3>
                <div className="about-team-cards-container">
                    <div className="about-individual-container">
                        <div>
                            <img src="https://avatars1.githubusercontent.com/u/32101386?s=400&u=c2249c907343dce7cb1ec938a98f361ff9defb6e&v=4" />
                        </div>
                        <p>David</p>
                        <div className="about-social-container">
                            <a href="https://github.com/davidyshin" target="_blank"><i className="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/y-davidshin/" target="_blank"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="about-individual-container">
                        <div>
                            <img src="https://i.imgur.com/JP3v79H.jpg" />
                        </div>
                        <p>Helen</p>
                        <div className="about-social-container">
                            <a href="https://github.com/helencho" target="_blank"><i className="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/haeyoungcho/" target="_blank"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="about-individual-container">
                        <div>
                            <img src="https://media.licdn.com/dms/image/C4D03AQEXNgDMRrMjSQ/profile-displayphoto-shrink_800_800/0?e=1528063200&v=alpha&t=Z1iqlRYXJc0WVFUxIErogIUbJkGeeLsZe9aV3g57zik" />
                        </div>
                        <p>Jerell</p>
                        <div className="about-social-container">
                            <a href="https://github.com/ramborell23" target="_blank"><i className="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/jerell-davis-2495bb150/" target="_blank"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="about-individual-container">
                        <div>
                            <img src="https://image.ibb.co/b7eM2H/sami.png" />
                        </div>
                        <p>Sami</p>
                        <div className="about-social-container">
                            <a href="https://github.com/alaac4q" target="_blank"><i className="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/sami-alaa-al-sudani-488704158/" target="_blank"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
