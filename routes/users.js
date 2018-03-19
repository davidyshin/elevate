const db = require('../backend/db/queries'); 
const express = require('express');
const router = express.Router();
const { loginRequired } = require('../auth/helpers');
const passport = require('../auth/local');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Users and Edit Users 
router.get('/u/all', db.getAllUsers); 
router.get('/u/:user_id', db.getSingleUser); 

// Jobs and Edit Jobs 
router.get('/j/all', db.getAllJobApps); // get all job applications 
router.get('/j/:user_id', db.getSingleUserJobApps); // get all job applications by a specific user 


// Cover Letters 

// Resumes 
router.get('/r/all', db.getAllResumes); // get all resumes 
router.get('/r/:user_id', db.getUsersResumes); // get all resumes by a specific user 

// Badges 


// Sign Up and Login 
router.post('/login', passport.authenticate('local'), (req, res) => res.json(req.user)); 
router.post('/signup', db.signup);
router.get('/logout', loginRequired, db.logout);


module.exports = router;
