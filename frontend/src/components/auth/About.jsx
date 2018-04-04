import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className="about-container">
                <h3>Meet the team</h3>
                <div className="about-team-cards-container">
                    <div className="about-individual-container">
                        <div>
                            <img src="https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2017/10/terrier-puppy.jpg?itok=rIgh3ArV&fc=50,50" />
                        </div>
                        <p>David</p>
                        <div className="about-social-container">
                            <a href="https://github.com/davidyshin" target="_blank"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/y-davidshin/" target="_blank"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="about-individual-container">
                        <div>
                            <img src="https://i.pinimg.com/originals/ec/db/bc/ecdbbc960442c58ca657b9cc50d11d30.jpg" />
                        </div>
                        <p>Helen</p>
                        <div className="about-social-container">
                            <a href="https://github.com/helencho" target="_blank"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/haeyoungcho/" target="_blank"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="about-individual-container">
                        <div>
                            <img src="https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Alaskan-Malamute-Mix-Puppy-600x600.jpg" />
                        </div>
                        <p>Jerell</p>
                        <div className="about-social-container">
                            <a href="https://github.com/ramborell23" target="_blank"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/jerell-davis-2495bb150/" target="_blank"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div className="about-individual-container">
                        <div>
                            <img src="https://fthmb.tqn.com/QFnKSQixWEsyIk53_Ov0ke_tDMA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/puppy-toy-581107c75f9b58564c6b6438.jpg" />
                        </div>
                        <p>Sami</p>
                        <div className="about-social-container">
                            <a href="https://github.com/alaac4q" target="_blank"><i class="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/sami-alaa-al-sudani-488704158/" target="_blank"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
