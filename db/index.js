var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/elevate";
var db = pgp(connectionString);

module.exports = db;
