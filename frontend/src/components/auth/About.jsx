import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div className="about-container">
                <h3>About the team</h3>
                <div className="about-team-cards-container">
                    <div className="about-individual-container">
                        <div>
                            <img src="https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2017/10/terrier-puppy.jpg?itok=rIgh3ArV&fc=50,50" />
                        </div>
                        <p>David</p>
                        <p>Github</p>
                    </div>

                    <div className="about-individual-container">
                        <div>
                            <img src="https://i.pinimg.com/originals/ec/db/bc/ecdbbc960442c58ca657b9cc50d11d30.jpg" />
                        </div>
                        <p>Helen</p>
                        <p>Github</p>
                    </div>

                    <div className="about-individual-container">
                        <div>
                            <img src="https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Alaskan-Malamute-Mix-Puppy-600x600.jpg" />
                        </div>
                        <p>Jerell</p>
                        <p>Github</p>
                    </div>

                    <div className="about-individual-container">
                        <div>
                            <img src="https://fthmb.tqn.com/QFnKSQixWEsyIk53_Ov0ke_tDMA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/puppy-toy-581107c75f9b58564c6b6438.jpg" />
                        </div>
                        <p>Sami</p>
                        <p>Github</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
