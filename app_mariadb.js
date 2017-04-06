var express = require('express'); //express 모듈을 획득.
var bodyParser = require('body-parser'); //body-parser 모듈 획득.
var Client = require('mariasql');
var c = new Client({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  db: 'o2'
}); // mariadb에 접속하는 객체 획득.
var app = express(); //application 객체 획득.

app.locals.pretty = true; // 페이지 소스보기에서 html 소스코드를 보기 쉽게 하기 위해서
app.set('views', './views_mariadb'); //템플릿의 위치를 설정.
app.set('view engine', 'jade'); //jade 엔진을 사용.

app.use(bodyParser.urlencoded({ extended: false })); //body-parser를 사용하기 위한 작업.

app.get('/topic/add', function(req, res){
  var sql = 'SELECT id, title FROM topic';
  c.query(sql, function(err, topics){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('add', {topics:topics}); //new.jade 파일로 응답.
  });
});

app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic(title, description, author) VALUES(:title, :description, :author)';
  var param = {
    title: title,
    description: description,
    author: author
  };
  c.query(sql, param, function(err, result){
    if(err){
      // code 500: 서버상에서 오류가 있다는 표현
      // 에러 리포팅은 불특정에게 하지 않는다.
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    //상세 페이지로 리다이렉션.
    res.redirect('/topic/'+result.info.insertId);
  });
});

app.get('/topic/:id/edit', function(req, res){
  //mariadb 데이터베이스에서 데이터를 읽어 온다.
  var sql = 'SELECT id, title FROM topic';
  c.query(sql, function(err, topics){
    // id 값의 존재 여부로 데이터 전달을 달리 한다.
    var id = req.params.id;
    if(id){ // id 값이 존재하면 상세보기.
      var sql = 'SELECT * FROM topic WHERE id=:id';
      var param = {id: id};
      c.query(sql, param, function(err, topic){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }else{
          res.render('edit', {topics: topics, topic: topic[0]});
        }
      });
    }else{ // 잘못된 접근
      console.log('There is no id');
      res.status(500).send('Internal Server Error');
    }
  });
});

app.post('/topic/:id/edit', function(req, res){
  var id = req.params.id;
  var param = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    id: id
  };
  var sql = 'UPDATE topic SET title=:title, description=:description, author=:author WHERE id=:id';
  c.query(sql, param, function(err, result){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else{
      //상세 페이지로 리다이렉션.
      res.redirect('/topic/'+id);
    }
  });
});

app.get('/topic/:id/delete', function(req, res){
  var id = req.params.id;
  var sql = 'SELECT id, title FROM topic';
  c.query(sql, function(err, topics){
    var sql = 'SELECT * FROM topic WHERE id=:id';
    c.query(sql, {id: id},function(err, topic){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }else{ // 잘못된 접근
        if(topic.length === 0){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }else{
          res.render('delete', {topics: topics, topic: topic[0]});
        }
      }
    });
  });
});
app.post('/topic/:id/delete', function(req, res){
  var id = req.params.id;
  var sql = 'DELETE FROM topic WHERE id=:id';
  c.query(sql, {id: id}, function(err, result){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else{
      res.redirect('/topic/');
    }
  });
});

// express 라우터는 여러개의 path를 가질 수 있다.
app.get(['/topic', '/topic/:id'], function(req, res){
  //mariadb 데이터베이스에서 데이터를 읽어 온다.
  var sql = 'SELECT id, title FROM topic';
  c.query(sql, function(err, topics){
    // id 값의 존재 여부로 데이터 전달을 달리 한다.
    var id = req.params.id;
    if(id){ // id 값이 존재하면 상세보기.
      var sql = 'SELECT * FROM topic WHERE id=:id';
      var param = {id: id};
      c.query(sql, param, function(err, topic){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }else{
          res.render('view', {topics: topics, topic: topic[0]});
        }
      });
    }else{ // 글 목록.
      res.render('view', {topics: topics});
    }
  });
});

//3000 포트를 사용.
app.listen(3000, function(){
  console.log('Connected, 3000 port');
});
