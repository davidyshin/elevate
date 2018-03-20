const db = require('./index');

const authHelpers = require('../auth/helpers.js');
const passport = require('../auth/local.js');

function registerUser(req, res, next) {
  const hash = authHelpers.createHash(req.body.user.password);
  db
    .none(
      'INSERT INTO Users (username, first_name, last_name, photo_url, password_digest, phone_number, experience) VALUES (${username}, ${firstName}, ${lastName}, ${photo_url}, ${password}, ${phoneNumber}, ${experience})',
      {
        username: req.body.user.username,
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        photo_url: 'https://avatars3.githubusercontent.com/u/12574319?s=400&v=4',
        password: hash,
        phoneNumber: req.body.user.phoneNumber,
        experience: 0
      }
    )
    .then(() => {
      res.status(200).json({
        message: 'it worked'
      });
    })
    .catch(err => {
      console.log(`Registration`, err);
      res.status(500).json({
        message: `Registration Failed   ${err} `,
        err
      });
    });
}

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send('log out success');
}

function getUser(req, res, next) {
  // console.log(req)
  db
    .one('SELECT * FROM Users WHERE id=${id}', {
      id: req.user.id
    })
    .then(data => {
      res.status(200).json({ user: data });
    })
    .catch((err) => {
      res.status(500).send('error getting user');
      return next(err)
    });
}

// For route = /users/getResume/:id/:job

function getResume(req, res, next) {
  let id = req.params.id
  let job = req.params.job

  db
    .any('SELECT resume_url  FROM jobs WHERE user_id = $1 and job_id = $2', [id, job])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        resume_url: data,
        message: 'Retrieved user resume'
      })
    })
    .catch((err) => {
      res.status(500).send('error getting job resume');
    })
}

// For route = /users/getCoverLetter/:id/:job
function getCoverLetter(req, res, next) {
  let id = req.params.id
  let job = req.params.job
  db
    .any('SELECT cover_url  FROM jobs WHERE user_id=$1 and job_id = $2', [id, job])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        cover_url: data,
        message: 'Retrieved job cover letters'
      })
    })
    .catch((err) => {
      res.status(500).send('error getting job cover letter');
    })
}





function getAllUserApps(req, res, next) {
  let id = req.params.id
  db
    .any('SELECT * FROM jobs WHERE user_id=$1', [id])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        applications: data,
        message: 'Retrieved all job apps for user'
      })
    })
    .catch((err) => {
      res.status(500).send('error getting all job applications for user');
      return next(err)
    })
}

function getUserAchievementBadges(req, res, next) {
  let id = req.user.id
  db
    .any('SELECT * FROM achievement_badges JOIN achievement_badges_earned ON achievement_badges_earned.badge_id = achievement_badges.badge_id WHERE user_id=$1', [id])
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data,
        message: 'Retrieved User Achievement Badges earned'
      })
    })
    .catch((err) => {
      res.status(500).send('error getting user achievement badges earned');
    })
}

function updateCoverLetter(req, res, next) {
  db.none(
    'UPDATE jobs SET cover_url = ${cover_url} WHERE job_id = ${job_id}'
    , {
      cover_url: req.body.cover_url,
      job_id: req.body.job_id,
    }
  )
    .then(() => {
      res.send(`Updated Cover Letter for user`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('error updating cover letter');
    });
}

function updateResume(req, res, next) {
  db.none(
    'UPDATE jobs SET resume_url = ${resume_url} WHERE job_id = ${job_id}'
    , {
      resume_url: req.body.resume_url,
      job_id: req.body.job_id,
    }
  )
    .then(() => {
      res.send(`Updated Resume for user`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('error updating resume');
    });
}

function createJobApp(req, res, next) {
  db.none(
    'INSERT INTO jobs ( user_id, company_name, company_logo, date_applied, position_title, job_email, job_phone_number) VALUES (${user_id}, ${job_id}, ${cover_letter_url})'
    , {
      user_id: req.user.id,
      company_name: req.body.company_name,
      company_logo: req.body.company_logo,
      date_applied: req.body.date_applied,
      job_email: req.body.job_email,
      job_phone_number: req.body.job_phone_number,
      position_title: req.body.position_title,
      company_url: req.body.url,
    }
  )
    .then(() => {
      res.send(`Created Job App`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('error creating job app');
    });
}

// Get rank badge earned 
function getRankedBadge(req, res, next) {
  db.any(
    'SELECT badge_url from rank_badges WHERE badge_level = ${level}',
    { level: req.params.level }
  )
    .then((data) => {
      res.send({
        badge: data
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('error getting ranked badge');
    });
}


function updateUsersInfo(req, res, next) {
  db
    .none(
      'UPDATE users SET username = ${username}, phone_number = ${phone_number} WHERE id = ${id}',
      {
        username: req.body.username,
        phone_number: req.body.phone_number,
        id: req.user.id
      }
    )
    .then(function (data) {
      res.status(200).json({
        status: 'success',
        message: 'Changed user information'
      });
    })
    .catch(function (err) {
      res.status(500).send('error updating user information');
      return next(err);
    });

}


function updateJobInterview(req, res, next) {
  db
    .none(
      'UPDATE Interview SET contacts = ${contact}, note = ${note} WHERE job_id = ${job_id}',
      {
        contact: req.body.contact,
        note: req.body.note,
        job_id: req.body.job_id
      }
    )
    .then(function (data) {
      res.status(200).json({
        status: 'success',
        message: 'updated job interview'
      });
    })
    .catch(function (err) {
      res.status(500).send('Error updating job interview');
    });
}

function getUserExp(req, res, next) {
  db
    .one('SELECT experience FROM Users WHERE id=${id}', {
      id: req.user.id
    })
    .then(data => {
      res.status(200).json({ exp: data });
    })
    .catch(function (err) {
      res.status(500).send('Error getting user experience');
    });
}

function getJobInterview(req, res, next) {
  db
    .one('SELECT * FROM Interview WHERE job_id=${job_id}', {
      job_id: req.body.job_id
    })
    .then(data => {
      res.status(200).json({ interview: data });
    })
    .catch(function (err) {
      res.status(500).send('Error getting job interview');
    });
}


module.exports = {
  registerUser,
  logoutUser,
  getUser,
  getResume,
  getCoverLetter,
  getAllUserApps,
  getUserAchievementBadges,
  updateResume,
  updateCoverLetter,
  createJobApp,
  getRankedBadge,
  updateUsersInfo,
  getUserExp,
  getUserInterview,
}
