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

/* 15. getAllAchievementBadges // GET Route = /users/getAllAchievementBadges */
router.get('/getAllAchievementBadges', loginRequired, db.getAllAchievementBadges)

/* ----------------------- POST Requests. ----------------------- */

/* 16. createJobApp // POST Route /users/createJobApp */
router.post('/createJobApp', loginRequired, db.createJobApp);

/* 17. createInterview // POST Route /users/createInterview */
router.post('/createInterview', loginRequired, db.createInterview);

/* 18. registerUser // POST Route = /users/newuser */
router.post('/newuser', db.registerUser);

/* 19. Login User // POST Route = /users/login */
/* This route goes through auth instead of our written queries */
router.post('/login', passport.authenticate('local'), (req, res) => {
  delete req.user.password_digest
  res.json(req.user);
});

/* 20. uploadCover AWS // POST Route = /users/uploadCover */
router.post('/uploadCover', upload.single('cover'), db.uploadCover);

/* 21. uploadResume AWS // POST Route = /users/uploadResume */
router.post('/uploadResume', upload.single('resume'), db.uploadResume);

/* 22. addAchievement // POST Route = /users/addAchievement */
router.post('/addAchievement', loginRequired, db.addAchievement);

/* ----------------------- PUT Requests. ----------------------- */

/* 23. updateResume URL on POSTGRES // PUT Route = /users/updateResume */
router.put('/updateResume', loginRequired, db.updateResume);

/* 24. updateCover URL on POSTGRES // PUT Route = /users/updatecover */
router.put('/updateCover', loginRequired, db.updateCover);

/* 25. updateInterview // PUT Route = /users/updateInterview */
router.put('/updateInterview', loginRequired, db.updateInterview);

/* 26. updateUserInfo // PUT Route = /users/updateUserInfo */
router.put('/updateUserInfo', loginRequired, db.updateUserInfo);

/* 27. updateJobProgress // PUT Route = /users/updateJobProgress */
router.put('/updateJobProgress', loginRequired, db.updateJobProgress);

/* 28. updateJobInfo // PUT Route = /users/updateJobInfo */
router.put('/updateJobInfo', loginRequired, db.updateJobInfo);

/* 29. updateExperience // PUT Route = /users/updateExperience */
router.put('/updateExperience', loginRequired, db.updateExperience);

/* 30. updateJobStatus // PUT Route = /users/updateJobStatus */
router.put('/updateJobStatus', loginRequired, db.updateJobStatus);

/* 31. updateNotification // PUT Route = /users/updateNotification */
router.put('/updateNotification', loginRequired, db.updateNotification);

module.exports = router;
