/* ----------------------------------------------------------------------------
 * 5.6 Using All
 * ----------------------------------------------------------------------------
 * Let's use the app.all() method to handle the name parameter instead of 
 * app.param().
 * 
 * 1. Add a call to all() for our router's '/:name' route. Pass a callback 
 * function that accepts request, response, and next.
 * 
 * 2. Now let's take our logic from the callback function passed to app.param() 
 * and move it to our all() callback.
 * 
 * 3. Now remove the original call to app.param().
*/

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// In memory store for the cities in our application
var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

// Searches for keyword in description and returns the city
function citySearch(keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function (city) {
    return city.match(regexp);
  });

  return result;
}

// Adds a new city to the in memory store
function createCity(name, description) {
  cities[name] = description;
  return name;
}

// Uppercase the city name.
function parseCityName(name) {
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

//app.param('name', function (request, response, next) {
//  request.cityName = parseCityName(request.params.name);
//});

var router = express.Router();

router.route('/')
  .get(function (request, response) {
    if(request.query.search) {
      response.json(citySearch(request.query.search));
    } else {
      response.json(cities);
    }
  })

  .post(parseUrlencoded, function (request, response) {
    if(request.body.description.length > 4) {
      var city = createCity(request.body.name, request.body.description);
      response.status(201).json(city);
    } else {
      response.status(400).json('Invalid City');
    }
  });

router.route('/:name')
  .all(function(request, response, next) {
  request.cityName = parseCityName(request.params.name);
})

  .get(function (request, response) {
    var cityInfo = cities[request.cityName];
    if(cityInfo) {
      response.json(cityInfo);
    } else {
      response.status(404).json("City not found");
    }
  })

  .delete(function (request, response) {
    if(cities[request.cityName]) {
      delete cities[request.cityName];
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  });

app.use('/cities', router);

app.listen(3000);


/* ----------------------------------------------------------------------------
 * Creating a Router Module
 * ----------------------------------------------------------------------------
 * Our single application file is growing too long. It's time we extract our 
 * routes to a separate Node module under the routes folder.
 * 
 * 1. Move our router and its supporting code from app.js to routes/cities.js.
 * 
 * 2. export our router object so other files can have access to it. Remember, 
 * Node - therefore Express - uses the CommonJS module specification.
 * 
 * 3. Our cities routes module is now ready to be used from app.js. Require 
 * the  * new routes/cities module from app.js and assign it to a variable 
 * called router;
*/

// app.js
var express = require('express');
var app = express();
var router = require('routes/cities');

app.use('/cities', router);
app.listen(3000);

//routes/cities.js
var express = require('express');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// In memory store for the
// cities in our application
var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

var router = express.Router();

router.route('/')
  .get(function (request, response) {
    if(request.query.search){
      response.json(citySearch(request.query.search));
    }else{
      response.json(cities);
    }
  })

  .post(parseUrlencoded, function (request, response) {
    if(request.body.description.length > 4){
      var city = createCity(request.body.name, request.body.description);
      response.status(201).json(city);
    }else{
      response.status(400).json('Invalid City');
    }
  });

router.route('/:name')
  .all(function (request, response, next) {
    request.cityName = parseCityName(request.params.name);
  })

  .get(function (request, response) {
    var cityInfo = cities[request.cityName];
    if(cityInfo){
      response.json(cityInfo);
    }else{
      response.status(404).json("City not found");
    }
  })

  .delete(function (request, response) {
    if(cities[request.cityName]){
      delete cities[request.cityName];
      response.sendStatus(200);
    }else{
      response.sendStatus(404);
    }
  });

// Searches for keyword in description
// and returns the city
function citySearch(keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function (city) {
    return city.match(regexp);
  });

  return result;
}

// Adds a new city to the
// in memory store
function createCity(name, description){
  cities[name] = description;
  return name;
}

// Uppercase the city name.
function parseCityName(name){
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

module.exports = router;