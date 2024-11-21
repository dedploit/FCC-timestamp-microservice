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

// API endpoint
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // If no date is provided, use the current date
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Handle UNIX timestamp (numeric string)
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  // Validate the parsed date
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the valid date response
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});