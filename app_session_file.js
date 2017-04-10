var express = require('express');
var session = require('express-session'); //express-session 모듈 가져오기.
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session); // 세션 데이터를 저장할 디렉토리 생성.

var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //body-parser를 사용하기 위한 작업.

//세션을 사용하기 위한 작업.
app.use(session({
  secret: '23423049wfsdkfj!!@!#',
  resave: false,
  saveUninitialized: true,
  store: new FileStore() // 세션을 파일로 저장하기 위해서.
}));

app.get('/count', function(req, res){
  if(req.session.count){
    req.session.count++;
  }else{
    req.session.count = 1;
  }

  res.send('count: '+req.session.count);
});

//그레이브 엑센트: ``
app.get('/auth/login', function(req, res){
  var output = `
  <form action="/auth/login" method="post">
    <h1>Login Example</h1>
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
      <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="submit" value="login">
    </p>
  </form>
  `;
  res.send(output);
});

app.get('/auth/logout', function(req, res){
  delete req.session.displayName; //session의 값 지우기.
  res.redirect('/welcome');
});

app.get('/welcome', function(req, res){
  if(req.session.displayName){
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>
      `);
  }else{
    res.send(`
      <h1>Welcomde</h1>
      <a href="/auth/login">Login</a>
      `);
  }
});

app.post('/auth/login', function(req, res){
  var user = {
    username: 'junhyeon',
    passwrod: '1234',
    displayName: 'junhyeon'
  };
  var name = req.body.username;
  var pwd = req.body.password;

  if(name === user.username && pwd === user.passwrod){
    req.session.displayName = user.displayName;
    res.redirect('/welcome');
  }else{
    res.send('Who are you? <a href="/auth/login">login</a>');
  }
});

app.listen(3000, function(){
  console.log('Connected 3000 port!!!!');
});
