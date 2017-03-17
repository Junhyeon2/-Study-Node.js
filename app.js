var express = require('express');
var app = express();

//get 메소드를 라우터라고 하고, 이러한 행위를 라우팅이라고 한다.
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/login', function (req, res) {
  res.send('Please Login!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
