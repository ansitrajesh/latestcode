const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const api = require('./api/index');
const BaseResponse = require('./utils/response');
const config = require('./config/config.json');
const app = express();
const LoginSchema = require('./models/login.model');

let dev_db_url = 'mongodb+srv://rajesh:12345@cluster0-zz3uu.mongodb.net/test?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect('mongodb+srv://rajesh:12345@cluster0-zz3uu.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const myModel = mongoose.model('login', ' LoginSchema');
const m = new myModel;
m.save();
// Database Connection


// configure the app
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,X-Requested-With');
  }
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
app.get('/token', (req, res) => {
  jwt.sign({ foo: 'bar' }, 'c682f92a2ba5c866b0ed444e023155e6', (err, token) => {
    if (err) {
      return res.json('Error');
    }
    return res.json(token);
  });
});
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/api', api);
app.get('/', (req, res) => res.json(BaseResponse.sendSuccess('App is running..!')));
app.listen(app.get('port'), () => console.log(`Application is running on localhost:${app.get('port')}..!`));
