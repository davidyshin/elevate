const db = require('./index');
const authHelpers = require('../auth/helpers.js');
const passport = require('../auth/local.js');

/* List of queries for reference
---------------------------------------
  GET Requests
---------------------------------------
 1. getAllUserApps
 2. getCoverLetter
 3. getJobInterview
 4. getRankedBadge
 5. getResume
 6. getUser
 7. getUserAchievementBadges
 8. getUserExp
 9. logoutUser

---------------------------------------
  POST Requests
---------------------------------------
 10. createJobApp
 11. registerUser

 ---------------------------------------
  PUT Requests
---------------------------------------
 12. updateCoverLetter
 13. updateResume
 14. updateJobInterview
 15. updateUsersInfo
--------------------------------------- 

*/

/* ------------------------ GET REQUESTS QUERIES ------------------------ */

/* 1. */
// GET Route = /users/getAllUserApps/:id
const getAllUserApps = (req, res, next) => {
  let id = req.params.id;
  db
    .any('SELECT * FROM jobs WHERE user_id=$1', [id])
    .then(data => {
      res.status(200).json({
        status: 'success',
        apps: data,
        message: 'Retrieved all job apps for user'
      });
    })
    .catch(err => {
      res.status(500).send('error getting all job applications for user');
      return next(err);
    });
};

/* 2. */
// GET Route = /users/getCoverLetter/:job

const getCoverLetter = (req, res, next) => {
  db
    .one(
      'SELECT cover_url FROM jobs WHERE user_id=${id} AND job_id = ${job}',
      {
        id: req.user.id,
        job: req.params.job
      }
    )
    .then(data => {
      res.status(200).json({
        status: 'success',
        cover_url: data,
        message: 'Retrieved cover letter'
      });
    })
    .catch(err => {
      res.status(500).send('error getting job cover letter');
    });
};

/* 3. */
// GET Route = /users/getJobInterview/:job

const getJobInterview = (req, res, next) => {
  db
    .any('SELECT * FROM Interview WHERE job_id=${job}', {
      job: req.params.job
    })
    .then(data => {
      res.status(200).json({ interviews: data });
    })
    .catch(function(err) {
      res.status(500).send('Error getting job interview');
    });
};

/* 4. */
// GET Route = /users/getRankedBadge/:level

const getRankedBadge = (req, res, next) => {
  db
    .one('SELECT badge_url FROM rank_badges WHERE badge_level = ${level}', {
      level: req.params.level
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        badge: data,
        message: 'Retrieved ranked badge for user'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('error getting ranked badge');
    });
};

/* 5. */
// GET Route = /users/getResume/:job

const getResume = (req, res, next) => {
  db
    .one(
      'SELECT resume_url FROM jobs WHERE user_id = ${id} AND job_id = ${job}',
      {
        id: req.user.id,
        job: req.params.id
      }
    )
    .then(data => {
      res.status(200).json({
        status: 'success',
        resume_url: data,
        message: 'Retrieved user resume'
      });
    })
    .catch(err => {
      res.status(500).send('error getting job resume');
    });
};

/* 6. */
// GET Route = /users/getUser/

const getUser = (req, res, next) => {
  db
    .one('SELECT * FROM Users WHERE id=${id}', {
      id: req.user.id
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        user: data,
        message: 'Retrieved user info'
      });
    })
    .catch(err => {
      res.status(500).send('error getting user');
      return next(err);
    });
};

/* 7. */
// GET Route = /users/getUserAchieves/

const getUserAchievementBadges = (req, res, next) => {
  db
    .any(
      'SELECT * FROM achievement_badges JOIN achievement_badges_earned ON achievement_badges_earned.badge_id = achievement_badges.badge_id WHERE user_id=${id}',
      { id: req.user.id }
    )
    .then(data => {
      res.status(200).json({
        status: 'success',
        achieves: data,
        message: 'Retrieved User Achievement Badges earned'
      });
    })
    .catch(err => {
      res.status(500).send('error getting user achievement badges earned');
    });
};

/* 8. */
// GET Route = /users/getUserExp

const getUserExp = (req, res, next) => {
  db
    .one('SELECT experience FROM Users WHERE id=${id}', {
      id: req.user.id
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        exp: data,
        message: 'Retrieved user experience'
      });
    })
    .catch(function(err) {
      res.status(500).send('Error getting user experience');
    });
};

/* 9. */
// GET Route = /users/logout

const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send('log out success');
};


/* ------------------------ POST REQUESTS QUERIES ------------------------ */


/* 10. */
// POST Route /users/createJobApp

const createJobApp = (req, res, next) => {
  db
    .none(
      'INSERT INTO jobs ( user_id, company_name, company_logo, date_applied, position_title, job_email, job_phone_number) VALUES (${user_id}, ${job_id}, ${cover_letter_url})',
      {
        user_id: req.user.id,
        company_name: req.body.company_name,
        company_logo: req.body.company_logo,
        date_applied: req.body.date_applied,
        job_email: req.body.job_email,
        job_phone_number: req.body.job_phone_number,
        position_title: req.body.position_title,
        company_url: req.body.url
      }
    )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Successfully created job appplication'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('error creating job app');
    });
};

/* 11. */
// POST Route = /users/newuser

const registerUser = (req, res, next) => {
  const hash = authHelpers.createHash(req.body.user.password);
  db
    .none(
      'INSERT INTO Users (username, first_name, last_name, photo_url, password_digest, phone_number, experience) VALUES (${username}, ${firstName}, ${lastName}, ${photo_url}, ${password}, ${phoneNumber}, ${experience})',
      {
        username: req.body.user.username,
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        photo_url:
          'https://avatars3.githubusercontent.com/u/12574319?s=400&v=4',
        password: hash,
        phoneNumber: req.body.user.phoneNumber,
        experience: 0
      }
    )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Successfully registered user'
      });
    })
    .catch(err => {
      console.log(`Registration`, err);
      res.status(500).json({
        message: `Registration Failed   ${err} `,
        err
      });
    });
};


/* ------------------------ PUT REQUESTS QUERIES ------------------------ */

/* 12. */
// PUT Route = /users/updateCoverLetter

const updateCoverLetter = (req, res, next) => {
  db
    .none('UPDATE jobs SET cover_url = ${cover_url} WHERE job_id = ${job_id}', {
      cover_url: req.body.cover_url,
      job_id: req.body.job_id
    })
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Updated cover letter'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('error updating cover letter');
    });
}

/* 13. */
// PUT Route = /users/updateResume

const updateResume = (req, res, next) => {
  db
    .none(
      'UPDATE jobs SET resume_url = ${resume_url} WHERE job_id = ${job_id}',
      {
        resume_url: req.body.resume_url,
        job_id: req.body.job_id
      }
    )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Updated resume'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('error updating resume');
    });
}

/* 14. */
// PUT Route = /users/updateInterview

const updateJobInterview = (req, res, next) => {
  db
    .none(
      'UPDATE Interview SET contact = ${contact}, note = ${note} WHERE job_id = ${job_id}',
      {
        contact: req.body.contact,
        note: req.body.note,
        job_id: req.body.job_id
      }
    )
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        message: 'Updated job interview'
      });
    })
    .catch(function(err) {
      res.status(500).send('Error updating job interview');
    });
}

/* 15. */
// PUT Route = /users/updateInfo

const updateUsersInfo = (req, res, next) => {
  db
    .none(
      'UPDATE users SET username = ${username}, phone_number = ${phone_number} WHERE id = ${id}',
      {
        username: req.body.username,
        phone_number: req.body.phone_number,
        id: req.user.id
      }
    )
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        message: 'updated user information'
      });
    })
    .catch(function(err) {
      res.status(500).send('error updating user information');
      return next(err);
    });
}

module.exports = {
  getAllUserApps,
  getCoverLetter,
  getJobInterview,
  getRankedBadge,
  getResume,
  getUser,
  getUserAchievementBadges,
  getUserExp,
  logoutUser,
  createJobApp,
  registerUser,
  updateCoverLetter,
  updateResume,
  updateJobInterview,
  updateUsersInfo
};
