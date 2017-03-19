var express = require('express');
var app = express();

// jade를 사용하기 위한 환경 설정 시작
app.locals.pretty = true; // 페이지 소스보기에서 html 소스코드를 보기 쉽게 하기 위해서
app.set('view engine', 'jade'); //jade 엔진과 express를 연결
app.set('views', './views'); //두번째 인자는 폴더위치를 가리킨다(jade파일 위치). 디폴트가 views폴더인데 명확히하기위해서 코드 작성.
// jade를 사용하기 위한 환경 설정 끝

app.use(express.static('public')); //정적인 파일이 위치할 디렉토리를 설정.

app.get('/template', function(req,res){
  //views폴더의 temp.jade 파일을 읽어들여 응답.
  //두 번째 매개변수에 jade 파일에 전달할 값들을 JSON 형식으로 전달할 수 있다.
  res.render('temp', {time : Date(), title: 'Jade'}); 
});

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
