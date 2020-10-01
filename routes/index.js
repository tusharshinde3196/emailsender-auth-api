var express = require("express");
var router = express.Router();
const sendMail = require("../helper/sendmail");

/* GET home page.Demo page to see if api works */
router.get("/", function (req, res, next) {
  res.send("GET request not available in this api");
});

//route created to take email,subject,email-body and return specific response
router.post("/", function (req, res, next) {
  let email = req.body.email;
  let subject = req.body.subject;
  let body = req.body.body;

  sendMail(email, subject, body)
    .then(function (response) {
      res.json(response);
    })
    .catch(function (error) {
      res.json(error);
    });

});

module.exports = router;
