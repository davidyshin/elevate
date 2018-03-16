const passport = require('passport');
const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/elevate');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    })

    passport.deserializeUser((username, done) => {
        db.one('SELECT username, password_digest FROM users WHERE username=$1', [username])
            .then((user) => {
                return done(null, user);
            })
            .catch((err) => {
                return done(err, null);
            })
    })
}
