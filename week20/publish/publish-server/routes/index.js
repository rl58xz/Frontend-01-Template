var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET home page. */
router.post('/', function(request, res, next) {
  console.log(request);
  // let body = [];
  // request.on('data',(chunk) => {
  //   body.push(chunk);
  // }).on('end',() => {
  //   body = Buffer.concat(body).toString();
  //   fs.writeFileSync('../server/public/' + req.query.filename,body)
  // })
  fs.writeFileSync('../server/public/' + request.query.filename,request.body.content);
  //res.render('index', { title: 'Express' });
});

module.exports = router;
