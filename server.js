
const express = require('express')
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('public'));

app.route('/recipes')
 .get((req, res) => {
  res.sendFile(path.join(__dirname + '/pages/recipes.html'));
});

app.route('/about')
 .get((req, res) => {
  res.sendFile(path.join(__dirname + '/pages/about.html'));
});

app.route('/contact')
 .get((req, res) => {
  res.sendFile(path.join(__dirname + '/pages/contact.html'));
});


app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});






