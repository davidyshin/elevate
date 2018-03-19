const db = require('./index');

const authHelpers = require('../auth/helpers.js');
const passport = require('../auth/local.js');

function registerUser(req, res, next) {
  const hash = authHelpers.createHash(req.body.user.password);
  db
    .none(
      'INSERT INTO Users (username, first_name, last_name, password_digest, phone_number) VALUES (${username}, ${firstName}, ${lastName}, ${password}, ${phoneNumber})',
      {
        username: req.body.user.username,
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        password: hash,
        phoneNumber: req.body.user.phoneNumber
      }
    )
    .then(() => {
      res.status(200).json({
        message: 'it worked'
      });
    })
    .catch(err => {
      console.log(`this is your error`, err);
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

// post

function getUser(req, res, next) {
    // console.log(req)
    db
      .one("SELECT * FROM Users WHERE id=${id}", {
        id: req.user.id
      })
      .then(data => {
        res.status(200).json({ user: data });
      });
  }

//Users
function getAllUsers() {
    return db.any('select * from Users')
}
function getSingleUser(id) {
    return db.any('SELECT *  FROM Users WHERE id=$1',[id])
}

// Resume and Cover Letter info
function getAllUsersInfo() {
    return db.any('select * from Users_Personal_Info')
}
function getSingleUsersInfo(id) {
    return db.any('SELECT *  FROM Users_Personal_Info WHERE id=$1',[id])
}

//Resumes 
function getAllResumes() {
    return db.any('select * from resumes')
}
function getUsersResumes(id) {
    return db.any('SELECT *  FROM resumes WHERE id=$1',[id])
}

//Job Applied to
function getAllJobApps() {
    return db.any('select * from jobs')
}
function getSingleUserJobApps(id) {
    return db.any('SELECT *  FROM jobs WHERE id=$1',[id])
}


module.exports = {
    registerUser,
    logoutUser,
    getUser,
    getAllUsers,
    getSingleUser,
    getAllUsersInfo,
    getSingleUsersInfo,
}
