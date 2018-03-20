const db = require('../db/queries');
const express = require('express');
const router = express.Router();
const { loginRequired } = require('../auth/helpers');
const passport = require('../auth/local');

/* GET users listing. */

//User login/logout and registration ROUTES
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

router.get('/logout', loginRequired, db.logoutUser);
router.post('/newuser', db.registerUser);

//get user when app loads from session
router.get('/getUser', loginRequired, db.getUser);



// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// // Users and Edit Users
// router.get('/u/all', db.getAllUsers);
// router.get('/u/:user_id', db.getSingleUser);

// // Jobs and Edit Jobs
// router.get('/j/all', db.getAllJobApps); // get all job applications
// router.get('/j/:user_id', db.getSingleUserJobApps); // get all job applications by a specific user

// // Cover Letters

// // Resumes
// router.get('/r/all', db.getAllResumes); // get all resumes
// router.get('/r/:user_id', db.getUsersResumes); // get all resumes by a specific user

// Badges

module.exports = router;
