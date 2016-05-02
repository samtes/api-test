var express = require("express");
var router = express.Router();
var User = require("../models/user");
var tools = require("../utilities/validate");
var error = require("../utilities/error");

router.post("/", function (req, res, next) {
  if (!req.body.email || !req.body.password || !req.body.confirmPassword) {
    return next(error.badRequest("Invalid request"));
  }
  var isValidEmail = tools.validateEmail(req.body.email);
  var isPasswordMatching = tools.passwordMatch(req.body.password, req.body.confirmPassword);
  var isPasswordValid = tools.verifyPassword(req.body.password);

  if (!isValidEmail) {
    return next(error.badRequest("Invalid email"));
  }

  if (!isPasswordMatching) {
    return next(error.badRequest("Password mismatch"));
  }

  if (!isPasswordValid) {
    return next(error.badRequest("Invalid password"));
  }

  new User(req.body).register(function (err, user) {
    if (err) {
      console.log("Are we coming here .... ?", err);
      return next(err);
    }

    res.status(201).send({
      user: user
    });
  });
});

module.exports = router;
