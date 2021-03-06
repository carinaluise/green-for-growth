
const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 3000;
const { body,validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const app = express();
const recipesDB = require('./recipes_db')

const { google } = require("googleapis");
const { reseller } = require('googleapis/build/src/apis/reseller');
const OAuth2 = google.auth.OAuth2;

require('dotenv').config()

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(express.urlencoded({
  extended: true
}))

app.route('/')
.get((req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})


app.route('/search')

  .post((req, res) => {
    

   const keyword = req.body.keyword
   const lowerCaseKey = keyword.toLowerCase();
   const replaceKey = lowerCaseKey.replace(/\s/g, "-")
  

   recipeInformation = []

    recipesDB.Recipes.forEach(element => {

      recipeInformation.push(element.name)
 
    })

    if(recipeInformation.includes(keyword)){
      res.sendFile(path.join(__dirname + `/public/pages/${replaceKey}.html`));
    } else {res.redirect('/recipes?error=' + encodeURIComponent('no-match'))

  }

    
  });


app.route('/recipes')
 .get((req, res) => {
  res.sendFile(path.join(__dirname + '/public/pages/recipes.html'));
});

app.route('/about')
 .get((req, res) => {
  res.sendFile(path.join(__dirname + '/public/pages/about.html'));
});

app.route('/contact')
 .get((req, res) => {
  res.sendFile(path.join(__dirname + '/public/pages/contact.html'));
});

app.route('/success')
 .get((req, res) => {
  res.sendFile(path.join(__dirname + '/public/pages/success.html'));
});

app.route('/error')
 .get((req, res) => {
  res.sendFile(path.join(__dirname + '/public/pages/error.html'));
});

app.route('/submit-form')
  .post([body('email').isEmail()],(req,res) => {
    const errors = validationResult(req);
    const email = req.body.email
    const topic = req.body.topic
    const content = req.body.content
    const body = `${email} sent a message with the topic: ${topic} and content: ${content} `
  
      const myOAuth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
      )

      myOAuth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
        });

      const myAccessToken = myOAuth2Client.getAccessToken()

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
             type: "OAuth2",
             user: process.env.SECRET_EMAIL, //your gmail account you used to set the project up in google cloud console"
             clientId: process.env.CLIENT_ID,
             clientSecret: process.env.CLIENT_SECRET,
             refreshToken: process.env.REFRESH_TOKEN,
             accessToken: myAccessToken //access token variable we defined earlier
        }});

      const mailOptions = {
        from: email, 
        to: process.env.SECRET_EMAIL, 
        subject: topic, 
        text: body
      };

    if (!errors.isEmpty()) {
       res.sendFile(path.join(__dirname + '/public/pages/error.html'))

    } else {
      transport.sendMail(mailOptions, function(error, info){
        
        if(error){
            console.log(error)
            res.sendFile(path.join(__dirname + '/public/pages/error.html'))
        }else{
         
          console.log(info)
        
          res.sendFile(path.join(__dirname + '/public/pages/success.html'))
  
        };
    });
    }
  
  });


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
});






