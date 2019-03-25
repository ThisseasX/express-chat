var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.all(/^\/.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'chat.html'))
})

module.exports = app;
