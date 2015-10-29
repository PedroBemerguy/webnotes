var express = require('express'),
  app = express(),
  cons = require('consolidate'),
  MongoClient = require('mongodb').MongoClient,
  MongoServer = require('mongodb').Server,
  Db = require('mongodb').Db,
  db = new Db('course', new MongoServer('localhost', 27017, {
    'native_parser': true
  }));
var bodyParser = require('body-parser');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.render('hello');


});

db.open(function (err, asdf) {
  app.route('/insert')
  .get(function(req, res) {
    res.render('usersadd');
  })
  .post(function(req, res) {
    db.collection("serverExample").insert({"name":req.body.firstname, "birthday":req.body.birthday})
    res.send('Mr/Mrs ' + req.body.firstname + ' was add in your MongoDB database');

  })


});

db.open(function (err, asdf) {
  app.get('/insert/:name',function (req, res) {
      console.log(req.params.name)
      db.collection('serverExample').insert({"name":req.params.name})
    })


});

// app.get('*', function (req, res) {
  // res.send("Page not found");
// });

app.listen(5000);
console.log("The server is listening at port 5000");
