const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const appRouter = express.Router();
const urlPrefix = '/site';
const fs = require('fs');

appRouter.use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.resolve(__dirname, '..', 'build')))
  .use('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
   })
  .get('/checkAadhar', (req, res) => loadData(req, res))
  .get('/msg', (req, res) => handleReq(req, res))
  .get('*', (req, res) => { res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html')); });

function handleReq(req, res) {
res.send('hi');
}

function loadData (req, res) {
  fs.readFile("data/loginData.json", "utf8", function(err, data){
    if(err) { 
      res.send(err);
      // throw err;
    } else {
      res.send(JSON.parse(data));
    }
});
}

if (urlPrefix) {
   app.get('/', (req, res) => res.sendStatus(200)); // '200 OK'
    // '200 OK'
}

app.use(urlPrefix, appRouter);

module.exports = app