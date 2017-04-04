var Client = require('mariasql');

var c = new Client({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  db: 'o2'
});
// example: SELECT
// var sql = 'SELECT * FROM topic';
// c.query(sql, function(err, rows) {
//   if(err){
//     console.log(err);
//   }else{
//     for(var i=0; i<rows.length; ++i){
//       console.log(rows[i].title);
//       console.log(rows[i].description);
//       console.log(rows[i].author);
//     }
//   }
// });

// example: INSERT
// var sql = 'INSERT INTO topic (title, description, author) VALUES(:title, :description, :author)';
// var param = {
//     title: 'Supervisor',
//     description: 'watcher',
//     author: 'mariadb'
// };
// c.query(sql, param , function(err, rows){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(rows.info.insertId);
//   }
// });

// example: UPDATE
// var sql = 'UPDATE topic SET title=:title, description=:description, author=:author where id=:id';
// var param = {
//     title: 'NPM',
//     description: 'Pacakager manager',
//     author: 'node',
//     id: '6'
// };
// c.query(sql, param , function(err, rows){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(rows);
//   }
// });

// example: DELETE
// var sql = 'DELETE FROM topic where id=:id';
// var param = {
//     id: '6'
// };
// c.query(sql, param , function(err, rows){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(rows);
//   }
// });
c.end();
