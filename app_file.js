var express = require('express'); //express 모듈을 획득.
var bodyParser = require('body-parser'); //body-parser 모듈 획득.
var fs = require('fs'); //file system 모듈 획득.
var app = express(); //application 객체 획득.

app.locals.pretty = true; // 페이지 소스보기에서 html 소스코드를 보기 쉽게 하기 위해서
app.set('views', './views_file'); //템플릿의 위치를 설정.
app.set('view engine', 'jade'); //jade 엔진을 사용.

app.use(bodyParser.urlencoded({ extended: false })); //body-parser를 사용하기 위한 작업.

app.get('/topic/new', function(req, res){
  //data폴더에서 데이터릴 읽어 온다.
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files}); //new.jade 파일로 응답.
  });
});

app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;

  //전달 받은 값을 파일로 저장.
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      // code 500: 서버상에서 오류가 있다는 표현
      // 에러 리포팅은 불특정에게 하지 않는다.
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    //상세 페이지로 리다이렉션.
    res.redirect('/topic/'+title);
  });
});

// express 라우터는 여러개의 path를 가질 수 있다.
app.get(['/topic', '/topic/:id'], function(req, res){
  //data폴더에서 데이터릴 읽어 온다.
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    //id 값의 존재 여부로 데이터 전달을 달리 한다.
    var id = req.params.id;
    if(id){
      fs.readFile('data/'+id, 'utf8',function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics: files, title:id, description:data});
      });
    }else{
      res.render('view', {topics:files, title:'Welcomde', description:'Hello, Javascript for server'});
    }
  });
});

//3000 포트를 사용.
app.listen(3000, function(){
  console.log('Connected, 3000 port');
});
