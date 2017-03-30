var express = require('express'); //express 모듈을 획득.
var bodyParser = require('body-parser'); //body-parser 모듈 획득.
var fs = require('fs'); //file system 모듈 획득.
var multer = require('multer'); //multer 모듈 획득.
var OrientDB = require('orientjs');

// orientDB는 기본적으로 2424 포트를 사용한다.
// 소스코드안에 비밀번호를 직접 입력하는 방법은 좋지 않은 방법이다.
var server = OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'orientdb'
});

var db = server.use('02');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
}); //upload 미들웨어의 옵션을 사용하기 위한 객체 생성.
var upload = multer({storage: storage}); //upload 미들웨어 획득(업로드 파일 위치 설정).

var app = express(); //application 객체 획득.

app.locals.pretty = true; // 페이지 소스보기에서 html 소스코드를 보기 쉽게 하기 위해서
app.set('views', './views_orientdb'); //템플릿의 위치를 설정.
app.set('view engine', 'jade'); //jade 엔진을 사용.

app.use(bodyParser.urlencoded({ extended: false })); //body-parser를 사용하기 위한 작업.
app.use('/user', express.static('uploads'));
// 업로드 폼을 보여주기 위한 라우터 작성.
app.get('/upload', function(req, res){
  res.render('upload');
});

// 업로드 파일을 저장하기 위한 라우터 작성.
// upload.single(): request 객체안에 file을 삽입해주는 미들웨어. 매개변수는 form태그의 name
app.post('/upload', upload.single('userfile'), function(req, res){
  console.log(req.file);
  res.send('uploaded, '+req.file.filename);
});

//라우터의 순서 중요! /topic/add 실행!, id로 인식 하지 않는다.
app.get('/topic/add', function(req, res){
  var sql = 'SELECT FROM topic';
  db.query(sql).then(function(topics){
    res.render('add', {topics:topics}); //new.jade 파일로 응답.
  });
});

app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;

  // 전달 받은 값을 데이터베이스에 저장
  var sql = 'INSERT INTO topic(title, description, author) VALUES(:title, :desc, :author)';
  db.query(sql, {
    params:{
      title: title,
      desc: description,
      author: author
    }
  }).then(function(results){
    res.redirect('/topic/'+encodeURIComponent(results[0]['@rid']));
  });
});

// 글을 수정하기 위해서 원래의 데이터를 불러오는 라우터
app.get('/topic/:id/edit', function(req, res){
  var sql = 'SELECT FROM topic';
  var id = req.params.id;
  db.query(sql).then(function(topics){
    var sql = 'SELECT FROM topic WHERE @rid=:rid';
    db.query(sql, {params:{rid: id}}).then(function(topic){
      res.render('edit', {topics: topics, topic: topic[0]});
    });
  });
});

//수정된 결과를 데이터베이스에 반영하는 라우터.
app.post('/topic/:id/edit', function(req, res){
  var sql = 'UPDATE topic set title=:t, description=:d, author=:a WHERE @rid=:rid';
  var id = req.params.id;
  var title = req.body.title;
  var desc = req.body.description;
  var author = req.body.author;
  db.query(sql, {
    params: {
      t: title,
      d: desc,
      a: author,
      rid: id
    }
  }).then(function(topics){
    res.redirect('/topics/'+encodeURIComponent(id));
  });
});

// 글을 삭제할껀지 확인하는 라우터
app.get('/topic/:id/delete', function(req, res){
  var sql = 'SELECT FROM topic';
  var id = req.params.id;
  db.query(sql).then(function(topics){
    var sql = 'SELECT FROM topic WHERE @rid=:rid';
    db.query(sql, {params:{rid: id}}).then(function(topic){
      res.render('delete', {topics: topics, topic: topic[0]});
    });
  });
});

//글을 삭제하는 경우 데이터베이스에서 삭제하기 위한 라우터
app.post('/topic/:id/delete', function(req, res){
  var sql = 'DELETE FROM topic WHERE @rid=:rid';
  var id = req.params.id;
  db.query(sql, {
    params: {
      rid: id
    }
  }).then(function(topics){
    res.redirect('/topic/');
  });
});

// express 라우터는 여러개의 path를 가질 수 있다.
app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'SELECT FROM topic';
  db.query(sql).then(function(topics){
    var sql = 'SELECT FROM topic WHERE @rid=:rid';
    var id = req.params.id;
    if(id){
      db.query(sql, {params:{rid: id}}).then(function(topic){
        res.render('view', {topics: topics, topic: topic[0]});
      });
    }else{
      res.render('view', {topics: topics});
    }
  });
});

//3000 포트를 사용.
app.listen(3000, function(){
  console.log('Connected, 3000 port');
});
