let arc = require('@architect/functions')
let cities = require('./cities.json')
let haversine = require('haversine')
let foods = require('./foods.json')
let zips = require('./unique-zips.json')
let zipMap = new Map();
zips.forEach( (item) => {
  for(var key in item) {
    zipMap.set(key, item[key])
  }
})

exports.handler = async function http(req) {
  let reqbody = arc.http.helpers.bodyParser(req)
  let textVal = reqbody.Body

  let body = '';
  let twilioResponse = await new Promise(resolve => {
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    const twiml = new MessagingResponse();
    let message = '';
    if(textVal == 'STOP') {
      message = 'Your stop message has been received. You will not receive any more messages from the California Food Bank service';
    } else {
      let cityFound = '';
      cities.forEach( (city) => {
        if(textVal.trim().toLowerCase() == city.properties.title.trim().toLowerCase()) {
          cityFound = city;
        }
      })
      if(!cityFound) {
        if(zipMap.get(textVal)) {
          zipMap.get(textVal).forEach( (potentialCity) => {
            cities.forEach( (city) => {
              if(potentialCity.trim().toLowerCase() == city.properties.title.trim().toLowerCase()) {
                cityFound = city;
              }
            })      
          })
        }
      }
      if(cityFound) {
        let coords = cityFound.geometry.coordinates;
        let sortedLocs = foods.features.sort(function (a, b) {
          return haversine(cityFound, a, { format: 'geojson', unit: 'mile' }) - haversine(cityFound, b, { format: 'geojson', unit: 'mile' })
        })
        let closestFood = sortedLocs[0];
        message = `Hi! Your nearest food bank is the ${closestFood.properties.title} at ${closestFood.properties.address}`;
        if(closestFood.properties.address2) {
          message += `, ${closestFood.properties.address2}. `;
        }
        if(closestFood.properties.website) { 
          message += `Their website is ${closestFood.properties.website}. `;
        }
        if(closestFood.properties.phone) { 
          message += `Call them at ${closestFood.properties.phone}. `;
        }
        message += `Get directions: https://maps.google.com/maps?daddr=${coords[1]},${coords[0]}`;
  
      } else {
        message = 'We did not recognize that location. Please text a city name or zip code';
      }
    }
    twiml.message(message);
    body = twiml.toString();
    resolve(twiml.toString())
  });

  console.log('response is '+twilioResponse)

  body = twilioResponse;

  return {
    headers: {
      'content-type': 'text/xml; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body
  }
}




