import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './models/user.js'

let PORT = 3000;
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const databaseUri = 'mongodb://localhost:27017/dev'

mongoose.connect(databaseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
      console.log('db listening on 27017')
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users/:id', (req, res) => {

  let id = req.params.id;

  User.findOne({ id: id }, function (err, user) {
      res.send(user);
  });
  
});

app.post('/users/', (req, res) => {

  let body = req.body;

  var user = new User();
  user.id = body.id;
  user.name = body.name;
  user.avatar = body.avatar;
  user.save();

  res.sendStatus(200);

});

app.listen(PORT, () => console.log(
  `API Server is now running on http://localhost:${PORT}`
));
