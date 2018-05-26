const db = require('./index');
const authHelpers = require('../auth/helpers.js');
const passport = require('../auth/local.js');
const dotenv = require('dotenv');
dotenv.load();
const multer = require('multer'),
  multerS3 = require('multer-s3'),
  fs = require('fs'),
  AWS = require('aws-sdk');

const nodemailer = require('nodemailer');
const { welcomeEmail } = require('../emails/email');
const { reminder } = require('../emails/email');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const moment = require('moment');
// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

const awsKeys = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
};

var s3 = new AWS.S3(awsKeys);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

/* List of queries/routes for reference
---------------------------------------
GET Requests
---------------------------------------
/* 1. getAllUserApps  // GET Route = /users/getAllUserApps */
/* 2. getCover // GET Route = /users/getCoverLetter/:job */
/* 3. getInterviews // GET Route = /users/getInterviews/:job */
/* 4. getRankedBadge  // GET Route = /users/getRankedBadge/:level */
/* 5. getResume // GET Route = /users/getResume/:job */
/* 6. getUser // GET Route = /users/getUser */
/* 7. getUserAchievementBadges  // GET Route = /users/getUserAchieves */
/* 8. getUserExp // GET Route = /users/getUserExp */
/* 9. logoutUser // GET Route = /users/logout */
/* 10. getLeaders // GET Route = /users/getLeaders */
/* 11. getJob // GET Route = /users/getJob
/* 12. getNotificationEmail // GET Route = /users/getNotificationEmail */
/* 13. getNotificationSms // GET Route = /users/getNotificationSms */
/* 14. getUserInterviews // GET Route = /users/GetUserInterviews */
/* 15. getAllAchievementBadges // Get Route = /users/getAllAchievementBadges */

// ---------------------------------------
//   POST Requests
// ---------------------------------------

/* 16. createJobApp // POST Route /users/createJobApp */
/* 17. createInterview // POST Route /users/createInterview */
/* 18. registerUser // POST Route = /users/newuser */
/* 19. Login User // POST Route = /users/login */
/* 20. uploadCover AWS // POST Route = /users/uploadCover */
/* 21. uploadResume AWS // POST Route = /users/uploadResume */
/* 22. addAchievement // POST Route = /users/addAchievement */

/*---------------------------------------
 PUT Requests
---------------------------------------

/* 23. updateResume URL on POSTGRES // PUT Route = /users/updateResume */
/* 24. updateCover URL on POSTGRES // PUT Route = /users/updatecover */
/* 25. updateInterview // PUT Route = /users/updateInterview */
/* 26. updateUserInfo // PUT Route = /users/updateUserInfo */
/* 27. updateJobProgress // PUT Route = /users/updateJobProgress */
/* 28. updateJobInfo // PUT Route = /users/updateJobInfo */
/* 29. updateExperience // PUT Route = /users/updateExperience */
/* 30. updateJobStatus // PUT Route = /users/updateJobStatus */
/* 31. updateNotification // PUT Route = /users/updateJobStatus */
/* 32. updateJobSalary' // PUT Route = /users/updateJobSalary */

/*--------------------------------------- 


/* ------------------------ GET REQUESTS QUERIES ------------------------ */

const getAllUserApps = (req, res, next) => {
  db
    .any('SELECT * FROM jobs WHERE user_id=${user_id}', {
      user_id: req.user.id
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        apps: data,
        message: 'Retrieved all job apps for user'
      });
    })
    .catch(err => {
      res
        .status(500)
        .send(`error getting all job applications for user:  ${err}`);
    });
};

const getCover = (req, res, next) => {
  db
    .one(
      'SELECT cover_url FROM jobs WHERE user_id=${user_id} AND job_id = ${job}',
      {
        user_id: req.user.id,
        job: req.params.job
      }
    )
    .then(data => {
      res.status(200).json({
        status: 'success',
        cover_url: data,
        message: 'Retrieved job cover letter'
      });
    })
    .catch(err => {
      res.status(500).send(`error getting job cover letter: ${err}`);
    });
};

const getInterviews = (req, res, next) => {
  db
    .any(
      'SELECT * FROM interview WHERE job_id = ${job_id} AND user_id = ${user_id}',
      {
        job_id: req.params.job,
        user_id: req.user.id
      }
    )
    .then(data => {
      res.status(200).json({ interviews: data });
    })
    .catch(function(err) {
      res.status(500).send(`Error getting job interview: ${err}`);
    });
};

const getRankedBadge = (req, res, next) => {
  db
    .one('SELECT * FROM rank_badges WHERE badge_level = ${level}', {
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
      res.status(500).send(`error getting ranked badge: ${err}`);
    });
};

const getResume = (req, res, next) => {
  db
    .one(
      'SELECT resume_url FROM jobs WHERE user_id = ${id} AND job_id = ${job}',
      {
        id: req.user.id,
        job: req.params.job
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
      res.status(500).send(`error getting job resume: ${err}`);
    });
};

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
      res.status(500).send(`error getting user: ${err}`);
      return next(err);
    });
};

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
      res
        .status(500)
        .send(`error getting user achievement badges earned: ${err}`);
    });
};

const getUserExp = (req, res, next) => {
  db
    .one('SELECT experience FROM Users WHERE id=${id}', {
      id: req.user.id
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        data,
        message: 'Retrieved user experience'
      });
    })
    .catch(err => {
      res.status(500).send(`Error getting user experience: ${err}`);
    });
};

const logoutUser = (req, res, next) => {
  req.logout();
  res.status(200).send('log out success');
};

const getLeaders = (req, res, next) => {
  db
    .any(
      'SELECT id, first_name, last_name, photo_url, experience FROM users ORDER BY experience DESC FETCH first 5 ROWS only'
    )
    .then(data => {
      res.status(200).json({
        status: 'success',
        data,
        message: 'Retrieved top 5 leaders by experience'
      });
    })
    .catch(err => {
      res.status(500).send(`Error getting leaders: ${err}`);
    });
};

const getJob = (req, res, next) => {
  db
    .one('SELECT * FROM jobs WHERE user_id=${user_id} AND job_id=${job_id}', {
      user_id: req.user.id,
      job_id: req.params.job_id
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        job: data,
        message: 'Retrieved job apps for user by ID'
      });
    })
    .catch(err => {
      res
        .status(500)
        .send(`error getting single job application for user:  ${err}`);
    });
};

const getUserInterviews = (req, res, next) => {
  db
    .any('SELECT * FROM interview WHERE user_id = ${user_id}', {
      user_id: req.user.id
    })
    .then(data => {
      res.status(200).json({
        status: 'success',
        interviews: data,
        message: 'Retrieved interviews for user by id'
      });
    })
    .catch(err => {
      res.status(500).send(`error getting user interviews : ${err}`);
    });
};

const getAllAchievementBadges = (req, res, next) => {
  db
    .any('SELECT * from achievement_badges')
    .then(data => {
      res.status(200).json({
        status: 'success',
        all_achievements: data,
        message: 'Retrieved All achievements in the system'
      });
    })
    .catch(err => {
      res.status(500).send(`error getting user interviews: ${err}`);
    });
};

/* ------------------------ POST REQUESTS QUERIES ------------------------ */

const createJobApp = (req, res, next) => {
  db
    .one(
      'INSERT INTO jobs ( user_id, company_name, company_logo, date_applied, date_logged, job_email, job_phone_number, position_title, job_posting_url, progress_in_search, job_status) VALUES ( ${user_id}, ${company_name}, ${company_logo}, ${date_applied}, ${date_logged}, ${job_email}, ${job_phone_number}, ${position_title}, ${job_posting_url}, ${progress_in_search}, ${job_status}) RETURNING job_id',
      {
        user_id: req.user.id,
        company_name: req.body.company_name,
        company_logo: req.body.company_logo,
        date_applied: req.body.date_applied,
        date_logged: req.body.date_logged,
        job_email: req.body.job_email,
        job_phone_number: req.body.job_phone_number,
        position_title: req.body.position_title,
        job_posting_url: req.body.job_posting_url,
        progress_in_search: req.body.progress_in_search,
        job_status: req.body.job_status
      }
    )
    .then(returned => {
      res.status(200).json({
        status: 'success',
        returned,
        message: 'Successfully created job appplication'
      });
    })
    .catch(err => {
      res.status(500).send(`Error creating job app:  ${err}`);
    });
};

const createInterview = (req, res, next) => {
  db
    .none(
      'INSERT INTO Interview (contact, note, interview_date, interview_time, user_id, job_id) VALUES (${contact}, ${note}, ${interview_date}, ${interview_time}, ${user_id}, ${job_id})',
      {
        contact: req.body.contact,
        note: req.body.note,
        job_id: req.body.job_id,
        user_id: req.user.id,
        interview_date: req.body.interview_date,
        interview_time: req.body.interview_time
      }
    )
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        message: 'Created job interview'
      });
    })
    .catch(function(err) {
      res.status(500).send(`Error creating job interview: ${err}`);
    });
};

const registerUser = (req, res, next) => {
  var mailOptions = {
    from: process.env.GMAIL_USER,
    to: req.body.username,
    subject: 'Welcome to Elevate',
    html: welcomeEmail(req.body.firstName)
  };

  const hash = authHelpers.createHash(req.body.password);
  db
    .none(
      'INSERT INTO Users (username, first_name, last_name, photo_url, password_digest, phone_number, experience) VALUES (${username}, ${firstName}, ${lastName}, ${photo_url}, ${password}, ${phoneNumber}, ${experience})',
      {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        photo_url: req.body.photo_url,
        password: hash,
        phoneNumber: req.body.phoneNumber,
        experience: 0
      }
    )
    .then(() => {
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    })
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Successfully registered user'
      });
    })
    .catch(err => {
      console.log(`Registration`, err);
      res.status(500).json({
        message: `Registration Failed: ${err} `,
        err
      });
    });
};

const uploadCover = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
  const file = req.file;
  var bucketName = 'elevatecovers';
  var params = {
    Bucket: bucketName,
    Key: 'cover-' + req.body.id + '-' + file.originalname,
    Body: file.buffer
  };
  s3.putObject(params, function(err, data) {
    if (err) console.log(err);
    console.log('Successfully uploaded file');
  });
  res.status(200).send({ url: params.Key });
};

const uploadResume = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
  const file = req.file;
  var bucketName = 'elevateresumes';
  var params = {
    Bucket: bucketName,
    Key: 'resume-' + req.body.id + '-' + file.originalname,
    Body: file.buffer
  };
  s3.putObject(params, function(err, data) {
    if (err) console.log(err);
    else data;

    console.log('Successfully uploaded file');
  });
  res.status(200).send({ url: params.Key });
};

const addAchievement = (req, res, next) => {
  db
    .none(
      'INSERT into achievement_badges_earned (user_id, badge_id) VALUES (${user_id}, ${badge_id})',
      {
        user_id: req.user.id,
        badge_id: req.body.badge_id
      }
    )
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'Successfully added achievement'
      });
    })
    .catch(err => {
      console.log(err)(`Error updating achievements earned: ${err}`);
    });
};

/* ------------------------ PUT REQUESTS QUERIES ------------------------ */

const updateCover = (req, res, next) => {
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
      console.log(err)(`Error updating cover letter: ${err}`);
    });
};

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
      res.status(500).send(`Error updating resume: ${err}`);
    });
};

const updateInterview = (req, res, next) => {
  db
    .none(
      'UPDATE Interview SET contact = ${contact}, note = ${note}, interview_date = ${interview_date}, interview_time = ${interview_time} WHERE job_id = ${job_id} AND user_id = ${user_id}',
      {
        contact: req.body.contact,
        note: req.body.note,
        user_id: req.user.id,
        job_id: req.body.job_id,
        interview_time: req.body.interview_time,
        interview_date: req.body.interview_date
      }
    )
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        message: 'Updated job interview'
      });
    })
    .catch(function(err) {
      res.status(500).send(`Error updating job interview: ${err}`);
    });
};

const updateUserInfo = (req, res, next) => {
  db
    .none(
      'UPDATE users SET first_name = ${first_name}, last_name = ${last_name}, phone_number = ${phone_number} WHERE id = ${id}',
      {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        phone_number: req.body.phoneNumber,
        id: req.user.id
      }
    )
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'updated user information'
      });
    })
    .catch(function(err) {
      res.status(500).send(`Error updating user information: ${err}`);
      return next(err);
    });
};

const updateJobProgress = (req, res, next) => {
  db
    .none(
      'UPDATE jobs SET progress_in_search = ${progress_in_search} WHERE job_id = ${job_id}',
      {
        progress_in_search: req.body.progress_in_search,
        job_id: req.body.job_id
      }
    )
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        message: 'updated job progress'
      });
    })
    .catch(function(err) {
      res.status(500).send(`Error updating job progress: ${err}`);
      return next(err);
    });
};

const updateJobInfo = (req, res, next) => {
  db
    .none(
      'UPDATE jobs SET date_applied = ${date_applied}, position_title = ${position_title}, job_posting_url = ${job_posting_url} WHERE job_id = ${job_id} AND user_id = ${user_id}',
      {
        user_id: req.user.id,
        job_id: req.body.job_id,
        date_applied: req.body.date_applied,
        position_title: req.body.position_title,
        job_posting_url: req.body.job_posting_url
      }
    )
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        message: 'updated job info'
      });
    })
    .catch(function(err) {
      res.status(500).send(`Error updating job info: ${err}`);
      return next(err);
    });
};

const updateExperience = (req, res, next) => {
  db
    .none('UPDATE users SET experience = ${experience} WHERE id = ${id}', {
      experience: req.body.experience,
      id: req.user.id
    })
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        message: 'updated user experience'
      });
    })
    .catch(function(err) {
      res.status(500).send(`Error updating job info: ${err}`);
      return next(err);
    });
};

const updateJobStatus = (req, res, next) => {
  db
    .none(
      'UPDATE jobs SET job_status = ${job_status} WHERE job_id = ${job_id}',
      { job_status: req.body.job_status, job_id: req.body.job_id }
    )
    .then(function(data) {
      res.status(200).json({
        status: 'success',
        message: 'updated user experience'
      });
    })
    .catch(function(err) {
      res.status(500).send(`Error updating job info: ${err}`);
      return next(err);
    });
};

const updateNotification = (req, res, next) => {
  db
    .none(
      'UPDATE users SET phone_notification = ${phone_notification} , email_notification = ${email_notification} , notification_interval = ${notification_interval} ' +
        ' WHERE id = ${id}',
      {
        id: req.user.id,
        phone_notification: req.body.phone_notification,
        email_notification: req.body.email_notification,
        notification_interval: req.body.notification_interval
      }
    )
    .then(function() {
      res.status(200).json({
        status: 'success',
        message: 'updated notification '
      });
    })
    .catch(function(err) {
      res.status(500).send(`Error updating notification info: ${err}`);
      return next(err);
    });
};

const getNotificationEmail = () => {
  const Mail = {
    from: '***REMOVED***'
  };

  db
    .any(
      'SELECT users.username, users.first_name , users.phone_number, interview.interview_date , interview.interview_time , jobs.company_name ' +
        ' FROM users INNER JOIN jobs ON users.ID = jobs.user_id ' +
        ' INNER JOIN interview ON jobs.job_id = interview.job_id ' +
        ' WHERE interview_date - notification_interval = CURRENT_DATE and interview_time = CURRENT_TIME(0) and email_notification = true '
    )
    .then(data => {
      console.log('number of email notifications: ', data.length);

      for (i = 0; i < data.length; i++) {
        console.log(data[i].phone_number);
        Mail.to = data[i].username;
        Mail.html = reminder(
          data[i].first_name,
          data[i].company_name,
          data[i].interview_date,
          data[i].interview_time
        );
        Mail.subject = `Reminder for your interview with ${
          data[i].company_name
        }`;

        transporter.sendMail(Mail, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email has been sent ' + info.response);
          }
        });
      }
    })
    .catch(err => {
      console.log(`Not get notification email:  ${err}`);
    });
};

const getNotificationSms = () => {
  db
    .any(
      'SELECT users.username, users.first_name , users.phone_number, interview.interview_date , interview.interview_time , jobs.company_name ' +
        ' FROM users INNER JOIN jobs ON users.ID = jobs.user_id ' +
        ' INNER JOIN interview ON jobs.job_id = interview.job_id ' +
        ' WHERE interview_date - notification_interval = CURRENT_DATE and interview_time = CURRENT_TIME(0) and phone_notification = true'
    )
    .then(data => {
      console.log('number of sms notifications: ', data.length);
      for (i = 0; i < data.length; i++) {
        client.messages.create({
          to: data[i].phone_number,
          from: process.env.TWILIO_PHONE_NUMBER,
          body: `Hello ${
            data[i].first_name
          }. Your interview with ${
            data[i].company_name
          } is on ${moment(data[i].interview_date).format(
            'dddd, MMMM Do YYYY'
          )} at ${moment(data[i].interview_time, 'HH:mm').format(
            'hh:mm a'
          )}. Good luck! -Team Elevate`
        });
      }
    })
    .catch(err => {
      console.log(`not getting notification SMS:  ${err}`);
    });
};

setInterval(() => {
  getNotificationEmail();
  getNotificationSms();
}, 1000);

const updateJobSalary = (req, res) => {
  db
    .none('UPDATE jobs SET salary = ${salary} WHERE job_id = ${job_id}', {
      job_id: req.body.job_id,
      salary: req.body.salary
    })
    .then(() => {
      res.status(200).json({
        status: 'success',
        message: 'successfully updated job salary '
      });
    })
    .catch(err => {
      res.status(500).send(`error updating job salary: ${err}`);
    });
};

module.exports = {
  getAllUserApps,
  getCover,
  getInterviews,
  getRankedBadge,
  getResume,
  getUser,
  getUserAchievementBadges,
  getUserExp,
  getLeaders,
  getJob,
  logoutUser,
  getUserInterviews,
  getAllAchievementBadges,
  createJobApp,
  createInterview,
  registerUser,
  updateCover,
  updateResume,
  updateInterview,
  updateUserInfo,
  updateJobProgress,
  updateJobInfo,
  updateExperience,
  updateJobStatus,
  uploadResume,
  uploadCover,
  addAchievement,
  updateNotification,
  updateJobSalary,
  getNotificationSms,
  getNotificationEmail
};
