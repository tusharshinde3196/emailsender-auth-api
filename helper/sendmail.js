const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require('dotenv').config();
const OAuth2 = google.auth.OAuth2;

module.exports = function (inputEmail, inputSubject, inputBody) {
  return new Promise(function (resolve, reject) {

      const oauth2Client = new OAuth2(
          process.env.CLIENT_ID,
          process.env.SECRET_KEY, // Client Secret
          "https://developers.google.com/oauthplayground" // Redirect URL
      );

      //
      oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN,
      });

      const accessToken = oauth2Client.getAccessToken();

      //function assigned to smtp.. to check authorization from google-Oauth2.0
      const smtpTransport = nodemailer.createTransport({
          service: "gmail",
          auth: {
              type: "OAuth2",
              user: process.env.SENDER_EMAIL,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.SECRET_KEY,
              refreshToken: process.env.REFRESH_TOKEN,//enter refresh token if availabel auth success or generate new access token
              accessToken: accessToken,
          },
          tls: {
              rejectUnauthorized: false,
          },
      });

      //values stored in this which are sent from route
      const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: inputEmail,
          subject: inputSubject,
          generateTextFromHTML: true,
          html: inputBody,
      };

      //function to send mail using smtp from nodemailer
      smtpTransport.sendMail(mailOptions, (error, response) => {
          if (error) {
              return reject({
                  message:"Error occurred!",
                  msg: error
              })
          }
          resolve({
              success: "Mail Sent!",
              msgId: response.messageId
          })
          smtpTransport.close();
      });
  });
}
