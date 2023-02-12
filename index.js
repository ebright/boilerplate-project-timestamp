// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', (req, res) => {
  if (req.params.date.match('^[0-9]*$')) {
    var dateQuery = new Date(parseInt(req.params.date));
    return res.json({"unix": dateQuery.getTime() , "utc": dateQuery.toUTCString()});
  }
  var dateQuery = new Date(req.params.date); 
  if (dateQuery.toString() === 'Invalid Date'){
    return res.json({"error": dateQuery.toString()});
  } else {
    return res.json({"unix": dateQuery.getTime() , "utc": dateQuery.toUTCString()});  
  }
});

app.get('/api', (req, res) => {
  const utcDate = new Date(Date.now());
  res.json({"unix": Date.now(), "utc": utcDate.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
