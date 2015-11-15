var express  = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3100);

app.get('/',function(req,res){
  res.render('home')
});

app.get('/getnpost',function(req,res){
  var getParmArr = [];
  for (var p in req.query){
    getParmArr.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.typeReq = "GET";
  context.getList = getParmArr;
  res.render('getnpost', context);
});

app.post('/getnpost', function(req,res){
  var getParmArr = [];
  for (var p in req.query){
    getParmArr.push({'name':p,'value':req.query[p]})
  }
  var postParmArr = [];
  for (var p in req.body){
    postParmArr.push({'name':p,'value':req.body[p]})
  }
  var context = {};
  context.typeReq = "POST";
  context.getList = getParmArr;
  context.postList = postParmArr;
  res.render('getnpost', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
