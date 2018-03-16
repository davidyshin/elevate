const bcrypt = require('bcryptjs');
const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/xxx');

const comparePassword = (userPassword, dbPassword) => {
    return bcrypt.compareSync(userPassword, dbPassword);
}

const createHash = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const loginRequired = (req, res, next) => {
    if(!req.username) {
        return res.status(401).json({
            status: 'Please log in'
        });
        return next();
    }
}

module.exports = {
    comparePassword,
    createHash,
    loginRequired
};



