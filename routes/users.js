const db = require('../db/queries');
const express = require('express');
const router = express.Router();
const { loginRequired } = require('../auth/helpers');
const passport = require('../auth/local');

/* List of queries/routes for reference
---------------------------------------
  GET Requests
---------------------------------------
 1. getAllUserApps  // GET Route = /users/getAllUserApps
 2. getCoverLetter  // GET Route = /users/getCoverLetter/:job
 3. getJobInterview // GET Route = /users/getJobInterview/:job
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
 11. registerUser // POST Route = /users/newuser

 ---------------------------------------
  PUT Requests
---------------------------------------
 12. updateCoverLetter // PUT Route = /users/updateCoverLetter
 13. updateResume // PUT Route = /users/updateResume
 14. updateJobInterview // PUT Route = /users/updateInterview
 15. updateUsersInfo // PUT Route = /users/updateInfo
--------------------------------------- 
*/

/* ----------------------- GET Requests. ----------------------- */

/*  1. getAllUserApps  // GET Route = /users/getAllUserApps */
router.get('/getAllUserApps/', loginRequired, db.getAllUserApps);

/* 2. getCoverLetter  // GET Route = /users/getCoverLetter/:job */
router.get('/getCoverLetter/:job', loginRequired, db.getCoverLetter);

/* 3. getJobInterview // GET Route = /users/getJobInterview/:job */
router.get('/getJobInterview/:job', loginRequired, db.getJobInterview);

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
router.get('/createJobApp', loginRequired, db.createJobApp);

/* 11. registerUser // POST Route = /users/newuser */
router.post('/newuser', db.registerUser);

/* Login User // POST Route = /users/login */
/* This route goes through auth instead of our written queries */
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

/* ----------------------- PUT Requests. ----------------------- */

/* 12. updateCoverLetter // PUT Route = /users/updateCoverLetter */
router.put('/updateCoverLetter', loginRequired, db.updateCoverLetter);

/* 13. updateResume // PUT Route = /users/updateResume */
router.put('/updateResume', loginRequired, db.updateResume);

/* 14. updateJobInterview // PUT Route = /users/updateInterview */
router.put('/updateInterview', loginRequired, db.updateResume);

/* 15. updateUserInfo // PUT Route = /users/updateUserInfo */
router.put('/updateUserInfo', loginRequired, db.updateUSerInfo);

module.exports = router;
