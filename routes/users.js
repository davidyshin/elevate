const db = require('../db/queries');
const express = require('express');
const router = express.Router();
const { loginRequired } = require('../auth/helpers');
const passport = require('../auth/local');
const dotenv = require('dotenv')
dotenv.load()
const multer = require('multer'),
  multerS3 = require('multer-s3'),
  fs = require('fs'),
  AWS = require('aws-sdk');
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
 2. getCoverLetter  // GET Route = /users/getCoverLetter/:job
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
 ---------------------------------------
  PUT Requests
---------------------------------------
 13. updateCoverLetter // PUT Route = /users/updateCoverLetter
 14. updateResume // PUT Route = /users/updateResume
 15. updateInterview // PUT Route = /users/updateInterview
 16. updateUserInfo // PUT Route = /users/updateInfo
 17. updateJobProgress // PUT Route = /users/updateJobProgress
 18. updateJobInfo // PUT Route = /users/updateJobInfo/
 19. updateExperience // PUT Route = /users/updateExperience
 20. updateJobStatus // PUT Route = /users/updateJobStatus
--------------------------------------- 
*/

/* ----------------------- GET Requests. ----------------------- */


/*  1. getAllUserApps  // GET Route = /users/getAllUserApps */
router.get('/getAllUserApps', loginRequired, db.getAllUserApps);

/* 2. getCoverLetter  // GET Route = /users/getCoverLetter/:job */
router.get('/getCoverLetter/:job', loginRequired, db.getCoverLetter);

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

/* ----------------------- PUT Requests. ----------------------- */

/* 13. Upload Cover AWS // POST Route = /users/UploadCovers */
// Router.post
router.post('/uploadCovers', function (req, res, next) {
  console.log("files: ", req.files)
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  const file = req.files.file;
  var bucketName = 'elevatecovers'
  var params = { Bucket: bucketName, Key: file.name, Body: file.data };
  var hold = file.data
  s3.putObject(params, function (err, data) {
    if (err)
      console.log(err)
    else
      console.log("Successfully uploaded data to " + bucketName + "/" + file.name);
  });
  next()
},
  db.updateCoverAws
)

/* 14. Upload Resume AWS // PUT Route = /users/updateResume */

router.post('/uploadResume', function (req, res, next) {
  console.log("data: ", req.body)
  if (!req.body.data) {
    return res.status(400).send('No files were uploaded.');
  }
  const file = req.body.data;
  var bucketName = 'elevateresumes'
  var params = { Bucket: bucketName, Key: 'lo50l', Body: file.data };
  // var hold = file.data
  s3.putObject(params, function (err, data) {
    if (err)
      console.log(err)
    else (data)
    console.log(data)
    // console.log("Successfully uploaded data to " + bucketName + "/" + file);
    return data
  });
}
)

// /* 13. updateCoverLetter // PUT Route = /users/updateCoverLetter */
// router.put('/updateCoverLetter', loginRequired, db.updateCoverLetter);

// router.put('/updateResume', loginRequired, db.updateResume);

/* 15. updateInterview // PUT Route = /users/updateInterview */
router.put('/updateInterview', loginRequired, db.updateInterview);

/* 16. updateUserInfo // PUT Route = /users/updateUserInfo */
router.put('/updateUserInfo', loginRequired, db.updateUserInfo);

/* 17. updateJobProgress // PUT Route = /users/updateJobProgress */
router.put('/updateJobProgress', loginRequired, db.updateJobProgress);

/* 18. updateJobInfo // PUT Route = /users/updateJobInfo */
router.put('/updateJobInfo', loginRequired, db.updateJobInfo)

/* 19. updateExperience // PUT Route = /users/updateExperience */
router.put('/updateExperience', loginRequired, db.updateExperience)

/* 20. updateJobStatus // PUT Route = /users/updateJobStatus */
router.put('/updateJobStatus', loginRequired, db.updateJobStatus)
module.exports = router;
