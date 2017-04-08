var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('sfklj23r09dfjsdfj!@#')); //cookie-parser를 사용하기 위한 작업.

var products = {
  1: {title: 'The history of web 1'},
  2: {title: 'The next web'}
}; // 데이터베이스를 대신해서 객체를 만들어 사용.

// html이나 템플릿을 사용하지 않기 위해서(Cookie 사용법에 집중하기 위해서)
app.get('/products', function(req, res){
  var output = '';
  for(var name in products){
    console.log(products[name].title);
    output += `
      <li>
        <a href="/cart/${name}">${products[name].title}</a>
      </li>
      `;
  }
  res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});

app.get('/cart/:id', function(req, res){
  var id = req.params.id;
  var cart;
  if(req.signedCookies.cart){ // Cookie에 cart의 값이 존재한다면.
    cart = req.signedCookies.cart;
  }else{
    cart = {};
  }
  if(!cart[id]){ // id 값이 존재하지 않는다면.
    cart[id] = 0;
  }
  cart[id] = parseInt(cart[id])+1;
  res.cookie('cart', cart, {signed: true});
  res.redirect('/cart');
});

app.get('/cart', function(req, res){
  var cart = req.signedCookies.cart;
  if(!cart){
    res.send('Empty');
  }else{
    var output = ``;
    for(var id in cart){
      output += `<li>${products[id].title} (${cart[id]})</li>`
    }
    res.send(`
      <h1>Cart</h1>
      <ul>${output}</ul>
      <a href="/products">Products List</a>
      `);
  }
});

app.get('/count',function(req, res){
  // 쿠기의 값은 url에 종속적이다.
  // 쿠기의 값은 문자열로 전송됨.
  var count;
  if(req.signedCookies.count){
    count = parseInt(req.signedCookies.count);
  }else{
    count = 0;
  }
  res.cookie('count', count+1, {signed: true});
  res.send('count: '+count);
});

app.listen(3000, function(){
  console.log('Connected 3000 port!!!!');
});
