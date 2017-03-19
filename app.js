var express = require('express');
var app = express();

app.use(express.static('public')); //정적인 파일이 위치할 디렉토리를 설정.

//get 메소드를 라우터라고 하고, 이러한 행위를 라우팅이라고 한다.
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; ++i){
    lis += '<li>coding</li>'
  }
  var time = Date();
  //``: 코멘티드 텍스트
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      hello dynamic!
      <ul>
        ${lis}
      </ul>
      ${time}
    </body>
  </html>`;
  res.send(output);
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
