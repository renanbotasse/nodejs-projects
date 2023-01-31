let request = require('request');

let apiKey = '**************************+';
let lat = '45.4783';
let lon = '9.124'
let url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:', body);
  }
});