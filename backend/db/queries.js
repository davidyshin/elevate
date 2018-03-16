const pgp = require('pg-promise')({});

const db = pgp("postgres://localhost/capTest");

function getAllUsers() {
    return db.any('select * from Users')
}
function getSingleUser(id) {
    return db.any('SELECT *  FROM Users WHERE id=$1',[id])
}


function getAllUsersInfo() {
    return db.any('select * from Users_Personal_Info')
}
function getSingleUsersInfo(id) {
    return db.any('SELECT *  FROM Users_Personal_Info WHERE id=$1',[id])
}


function getAllResumes() {
    return db.any('select * from resumes')
}
function getUsersResumes(id) {
    return db.any('SELECT *  FROM resumes WHERE id=$1',[id])
}


function getAllJobApps() {
    return db.any('select * from jobs')
}
function getSingleUserJobApps(id) {
    return db.any('SELECT *  FROM jobs WHERE id=$1',[id])
}


module.exports = {

}
