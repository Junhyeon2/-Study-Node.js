var express = require('express');
var app = express();

app.use(express.static('public')); //정적인 파일이 위치할 디렉토리를 설정.

//get 메소드를 라우터라고 하고, 이러한 행위를 라우팅이라고 한다.
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/app_logo.png">')
});

app.get('/login', function (req, res) {
  res.send('Please Login!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
