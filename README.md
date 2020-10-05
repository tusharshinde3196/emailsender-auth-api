# emailsender-auth-api
# this project is built with Express, gmail-api,nodemailer and node.js

End ponit to send message :
POST     http://localhost:3000/mail
format to send through body:
{
  "email":"any-email-id",
  "subject":"email-subject",
  "body":"email-body"
}
To work with this api you need to store credentials in .env file and generate access token for the first time  in googleapi.playground

1)this API is made to send email with localhost and runs on 3000 port
2) user must send {email,subject,body} in post method to test
3)after passing email you can see the log of message successfully sent or if there is any error you can see it in log.
