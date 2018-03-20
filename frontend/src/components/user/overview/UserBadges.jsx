import React, { Component } from 'react';

class UserBadges extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
        <div className="user-badges-container" id="badges">
            <div className="user-badge-image-container">
                <img src="https://lh6.googleusercontent.com/lH8xOLbhbdwY4r2RXT3Ads3WeePO1GNiDepV31Ue3QlBc6KaP3BwEPXHczUMGnSQwgZaXFio8csxoSSL8qai=w1440-h780" alt="badge" class="user-progress-badge" />
                <img src="https://lh6.googleusercontent.com/oHUjsOFPy7lGS9Cxelovl_ghw7wWNCOA1VXKVNB5SOQ36_rYx7MBv2OsYzsYnPMN5R85zG_Du2BAFdlNXkQu=w1440-h780" alt="badge" class="user-progress-badge" />
                <img src="https://lh6.googleusercontent.com/zYexlUXp2lAIIJ-exYxSIQUbRCSbs_CQ09E9cWngx3rSDMgFyEwRJ-IuZYnfAkK6eV7jZSDAOl8YZZCOs0Hs=w1440-h780" alt="badge" class="user-progress-badge" />
            </div>
            <h3>More Badges</h3>
        </div>
    )
  }
}

export default UserBadges;
