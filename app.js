var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// jade를 사용하기 위한 환경 설정 시작
app.locals.pretty = true; // 페이지 소스보기에서 html 소스코드를 보기 쉽게 하기 위해서
app.set('view engine', 'jade'); //jade 엔진과 express를 연결
app.set('views', './views'); //두번째 인자는 폴더위치를 가리킨다(jade파일 위치). 디폴트가 views폴더인데 명확히하기위해서 코드 작성.
// jade를 사용하기 위한 환경 설정 끝

app.use(express.static('public')); //정적인 파일이 위치할 디렉토리를 설정.
app.use(bodyParser.urlencoded({ extended: false })); //body-parser를 사용하기 위한 작업.

// form 예제를 위한 라우터 작성
app.get('/form', function(req, res){
  res.render('form');
});

// form 으로 넘겨진 데이터를 받기위한 get 방식 라우터 작성
app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
});

// form 으로 넘겨진 데이터를 받기위한 post 방식 라우터 작성
app.post('/form_receiver', function(req, res){
  //body-parser라는 미들웨어를 사용하여 post 방식으로 전송한 데이터를 받는다.
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});

// 쿼리 스트링을 사용하기 위한 라우터 작성(시맨틱 URL 적용)
app.get('/topic/:id', function(req, res){
  //res.send(req.query.id+','+req.query.name); /topic?id=1?name=junhyeon
  var topics = [
    'javascript is ...',
    'node.js is ...',
    'express is ...'
  ];
  var output = `
    <a href='/topic/0'>javascript</a><br>
    <a href='/topic/1'>node.js</a><br>
    <a href='/topic/2'>express</a><br><br>
    ${topics[req.params.id]}
  `;
  res.send(output);
});

app.get('topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode);
});

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
    lis += '<li>coding</li>';
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
  res.send('Hello Router, <img src="/app_logo.png">');
});

app.get('/login', function (req, res) {
  res.send('Please Login!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
