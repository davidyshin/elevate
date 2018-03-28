const db = require('../db/queries');
const express = require('express');
const router = express.Router();
const { loginRequired } = require('../auth/helpers');
const passport = require('../auth/local');
const dotenv = require('dotenv');
dotenv.load();
const multer = require('multer');
const upload = multer();

const multerS3 = require('multer-s3');
const fs = require('fs');
const AWS = require('aws-sdk');
const awsKeys = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
};

// AWS.config.loadFromPath(awsKeys);
var s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
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

// ---------------------------------------
//   POST Requests
// ---------------------------------------

/* 15. createJobApp // POST Route /users/createJobApp */
/* 16. createInterview // POST Route /users/createInterview */
/* 17. registerUser // POST Route = /users/newuser */
/* 18. Login User // POST Route = /users/login */
/* 19. uploadCover AWS // POST Route = /users/uploadCover */
/* 20. uploadResume AWS // POST Route = /users/uploadResume */
/* 21. addAchievement // POST Route = /users/addAchievement */

/*---------------------------------------
 PUT Requests
---------------------------------------

/* 22. updateResume URL on POSTGRES // PUT Route = /users/updateResume */
/* 23. updateCover URL on POSTGRES // PUT Route = /users/updatecover */
/* 24. updateInterview // PUT Route = /users/updateInterview */
/* 25. updateUserInfo // PUT Route = /users/updateUserInfo */
/* 26. updateJobProgress // PUT Route = /users/updateJobProgress */
/* 27. updateJobInfo // PUT Route = /users/updateJobInfo */
/* 28. updateExperience // PUT Route = /users/updateExperience */
/* 29. updateJobStatus // PUT Route = /users/updateJobStatus */
/* 30. updateNotification // PUT Route = /users/updateJobStatus */

/*--------------------------------------- 


/* ----------------------- GET Requests. ----------------------- */

/*  1. getAllUserApps  // GET Route = /users/getAllUserApps */
router.get('/getAllUserApps', loginRequired, db.getAllUserApps);

/* 2. getCover // GET Route = /users/getCoverLetter/:job */
router.get('/getCover/:job', loginRequired, db.getCover);

/* 3. getInterviews // GET Route = /users/getInterviews/:job */
router.get('/getInterviews/:job', loginRequired, db.getInterviews);

/* 4. getRankedBadge  // GET Route = /users/getRankedBadge/:level */
router.get('/getRankedBadge/:level', loginRequired, db.getRankedBadge);

/* 5. getResume // GET Route = /users/getResume/:job */
router.get('/getResume/:job', loginRequired, db.getResume);

/* 6. getUser // GET Route = /users/getUser */
router.get('/getUser', loginRequired, db.getUser);

/* 7. getUserAchievementBadges  // GET Route = /users/getUserAchieves */
router.get('/getUserAchieves', loginRequired, db.getUserAchievementBadges);

/* 8. getUserExp // GET Route = /users/getUserExp */
router.get('/getUserExp', loginRequired, db.getUserExp);

/* 9. logoutUser // GET Route = /users/logout */
router.get('/logout', loginRequired, db.logoutUser);

/* 10. getLeaders // GET Route = /users/getLeaders */
router.get('/getLeaders', loginRequired, db.getLeaders);

/* 11. getJob // GET Route = /users/getJob/job_id */
router.get('/getJob/:job_id', loginRequired, db.getJob);

/* 12. getNotificationEmail // GET Route = /users/getNotificationEmail */
router.get('/getNotificationEmail', db.getNotificationEmail);

/* 13. getNotificationSms // GET Route = /users/getNotificationSms */
router.get('/getNotificationSms', db.getNotificationSms);

/* 14. getUserInterviews // GET Route = /users/getUserInterviews */
router.get('/getUserInterviews', loginRequired, db.getUserInterviews);

/* ----------------------- POST Requests. ----------------------- */

/* 15. createJobApp // POST Route /users/createJobApp */
router.post('/createJobApp', loginRequired, db.createJobApp);

/* 16. createInterview // POST Route /users/createInterview */
router.post('/createInterview', loginRequired, db.createInterview);

/* 17. registerUser // POST Route = /users/newuser */
router.post('/newuser', db.registerUser);

/* 18. Login User // POST Route = /users/login */
/* This route goes through auth instead of our written queries */
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

/* 19. uploadCover AWS // POST Route = /users/uploadCover */
router.post('/uploadCover', upload.single('cover'), db.uploadCover);

/* 20. uploadResume AWS // POST Route = /users/uploadResume */
router.post('/uploadResume', upload.single('resume'), db.uploadResume);

/* 21. addAchievement // POST Route = /users/addAchievement */
router.post('/addAchievement', loginRequired, db.addAchievement);

/* ----------------------- PUT Requests. ----------------------- */

/* 22. updateResume URL on POSTGRES // PUT Route = /users/updateResume */
router.put('/updateResume', loginRequired, db.updateResume);

/* 23. updateCover URL on POSTGRES // PUT Route = /users/updatecover */
router.put('/updateCover', loginRequired, db.updateCover);

/* 24. updateInterview // PUT Route = /users/updateInterview */
router.put('/updateInterview', loginRequired, db.updateInterview);

/* 25. updateUserInfo // PUT Route = /users/updateUserInfo */
router.put('/updateUserInfo', loginRequired, db.updateUserInfo);

/* 26. updateJobProgress // PUT Route = /users/updateJobProgress */
router.put('/updateJobProgress', loginRequired, db.updateJobProgress);

/* 27. updateJobInfo // PUT Route = /users/updateJobInfo */
router.put('/updateJobInfo', loginRequired, db.updateJobInfo);

/* 28. updateExperience // PUT Route = /users/updateExperience */
router.put('/updateExperience', loginRequired, db.updateExperience);

/* 29. updateJobStatus // PUT Route = /users/updateJobStatus */
router.put('/updateJobStatus', loginRequired, db.updateJobStatus);

/* 30. updateNotification // PUT Route = /users/updateNotification */
router.put('/updateNotification', loginRequired, db.updateNotification);

module.exports = router;
