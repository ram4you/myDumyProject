const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const appRouter = express.Router();
const urlPrefix = '/site';
const fs = require('fs');
const noError = {
  msg: 'no Error'
}

appRouter.use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(express.static(path.resolve(__dirname, '..', 'build')))
  .use('/', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
   })
  .get('/checkAadhar', (req, res) => checkAadhar(req, res))
  .get('/loadDetails', (req, res) => loadDetailsData(req, res))
  .get('/msg', (req, res) => handleReq(req, res))
  .get('*', (req, res) => { res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html')); })
  .post('/saveAadhar', (req, res) => saveAadharData(req, res))
  .post('/saveRecord', (req, res) => saveRecordData(req, res));

function handleReq(req, res) {
  res.send('hi');
}

function checkAadhar (req, res) {
  fs.readFile("data/loginData.json", "utf8", function(err, data){
    if(err) { 
      res.send({});
      // throw err;
    } else {
      res.send(JSON.parse(data));
    }
  });
}

function saveAadharData (req, res) {
const userData = JSON.stringify(req.body, null, 2);

 fs.writeFile('data/loginData.json', userData, 'utf8', (err) => {
   if (err) {
    res.send(err)
   } else {
     res.send(noError);
   }
 })
}

function saveRecordData (req, res) {
  const userData = JSON.stringify(req.body, null, 2);

  //console.log(userData);
  
  fs.writeFile('data/userDetailsTable.json', userData, 'utf8', (err) => {
    if (err) {
    res.send(err)
    } else {
      res.send(noError);
    }
  })
}

function loadDetailsData (req, res) {
  fs.readFile("data/userDetailsTable.json", "utf8", function(err, data){
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