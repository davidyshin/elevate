var pgp = require("pg-promise")({});
var connectionString = process.env.NODE_ENV === "development" ? "postgres://localhost/elevate" : "postgres://ghwxwxpsqjcswz:d8adcd528f7ddece3e1ae624ec05b1aac24ae7cccb4c5aeb5e1c7efda10fe690@ec2-174-129-225-9.compute-1.amazonaws.com:5432/dena8jocmqv4u0"
var db = pgp(connectionString);

module.exports = db;
