const db = require('../db/queries');
const express = require('express');
const router = express.Router();
const { loginRequired } = require('../auth/helpers');
const passport = require('../auth/local');
const dotenv = require('dotenv')
dotenv.load()
const multer = require('multer')
const upload = multer()

const multerS3 = require('multer-s3')
const fs = require('fs');
const AWS = require('aws-sdk');
const awsKeys = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
}

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
 1. getAllUserApps  // GET Route = /users/getAllUserApps
 2. getCover  // GET Route = /users/getCover/:job
 3. getInterviews // GET Route = /users/getInterviews/:job
 4. getRankedBadge  // GET Route = /users/getRankedBadge/:level
 5. getResume // GET Route = /users/getResume/:job
 6. getUser // GET Route = /users/getUser
 7. getUserAchievementBadges  // GET Route = /users/getUserAchieves
 8. getUserExp // GET Route = /users/getUserExp
 9. logoutUser // GET Route = /users/logout

---------------------------------------
  POST Requests
---------------------------------------
 10. createJobApp // POST Route /users/createJobApp
 11. createInterview // // POST Route /users/createInterview
 12. registerUser // POST Route = /users/newuser
 13. uploadCover AWS // POST Route = /users/uploadCover
 14. uploadResume AWS // POST Route = /users/uploadResume
 ---------------------------------------
  PUT Requests
---------------------------------------
 15. updateCover // PUT Route = /users/updateCover
 16. updateResume // PUT Route = /users/updateResume
 17. updateInterview // PUT Route = /users/updateInterview
 18. updateUserInfo // PUT Route = /users/updateInfo
 19. updateJobProgress // PUT Route = /users/updateJobProgress
 20. updateJobInfo // PUT Route = /users/updateJobInfo/
 21. updateExperience // PUT Route = /users/updateExperience
 22. updateJobStatus // PUT Route = /users/updateJobStatus
--------------------------------------- 
*/

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
router.get('/getLeaders', loginRequired, db.getLeaders)

/* ----------------------- POST Requests. ----------------------- */

/* 10. createJobApp // POST Route /users/createJobApp */
router.post('/createJobApp', loginRequired, db.createJobApp);

/* 11. createInterview // POST Route /users/createInterview */
router.post('/createInterview', loginRequired, db.createInterview);

/* 12. registerUser // POST Route = /users/newuser */
router.post('/newuser', db.registerUser);

/* Login User // POST Route = /users/login */
/* This route goes through auth instead of our written queries */
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});


/* 13. uploadCover AWS // POST Route = /users/uploadCover */
router.post('/uploadCover', upload.single('cover'), db.uploadCover)

/* 15. uploadResume AWS // PUT Route = /users/uploadResume */
router.post('/uploadResume', upload.single('resume'), db.uploadResume)

/* ----------------------- PUT Requests. ----------------------- */


/* 16. updateResume URL on POSTGRES // PUT Route = /users/updateResume */
router.put('/updateResume', loginRequired, db.updateResume)

/* 17. updateCover URL on POSTGRES // PUT Route = /users/updatecover */
router.put('/updateCover', loginRequired, db.updateCover)


/* 18. updateInterview // PUT Route = /users/updateInterview */
router.put('/updateInterview', loginRequired, db.updateInterview);

/* 19. updateUserInfo // PUT Route = /users/updateUserInfo */
router.put('/updateUserInfo', loginRequired, db.updateUserInfo);

/* 20. updateJobProgress // PUT Route = /users/updateJobProgress */
router.put('/updateJobProgress', loginRequired, db.updateJobProgress);

/* 21. updateJobInfo // PUT Route = /users/updateJobInfo */
router.put('/updateJobInfo', loginRequired, db.updateJobInfo)

/* 22. updateExperience // PUT Route = /users/updateExperience */
router.put('/updateExperience', loginRequired, db.updateExperience)

/* 23. updateJobStatus // PUT Route = /users/updateJobStatus */
router.put('/updateJobStatus', loginRequired, db.updateJobStatus)
module.exports = router;
