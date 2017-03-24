var OrientDB = require('orientjs');

// orientDB는 기본적으로 2424 포트를 사용한다.
var server = OrientDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'orientdb'
});

// Database API는 서버에 존재하는 데이터베이스를 제어하는 API
var db = server.use('02');

// Record API 테이블의 행을 제어하는 API
// db.record.get('#33:0').then(function(record){
//   console.log('Loaded record: ', record);
// });

// READ ALL
// var sql = 'SELECT FROM topic';
// db.query(sql).then(function(results){
//   console.log(results);
// });

// READ ONE (WHERE)
// var sql = 'SELECT FROM topic WHERE @rid=:rid';
// var params = {
//   params:{
//     rid: '#33:0'
//   }
// };
// // sql 다음 파라미터에 params 객체를 전달하여 where절의 값을 바인딩 시킨다.
// db.query(sql, params).then(function(results){
//   console.log(results);
// });

//CREATE
// var sql = 'INSERT INTO topic(title, description) VALUES(:title, :desc)';
// db.query(sql, {
//   params: {
//     title: 'Express',
//     desc: 'Express is framework for web.'
//   }
// }).then(function(results){
//   //results의 값은 입력한 값을 객체로 가지고 있음.
//   console.log(results);
// });

//UPDATE
// var sql = "UPDATE topic SET title=:title WHERE @rid=:rid";
// db.query(sql,{
//   params:{
//     title: 'Express2',
//     rid: '#33:1'
//   }
// }).then(function(results){
//   //results의 값으로 수정된 행의 개수를 가지고 있음.
//   console.log(results);
// });

//DELETE
// var sql = 'DELETE FROM topic WHERE @rid=:rid';
// db.query(sql, {
//   params: {
//     rid: '#33:1'
//   }
// }).then(function(results){
// //results의 값으로 삭제된 행의 개수를 가지고 있음.
//   console.log(results);
// });
