exports.handler = async function http(req) {

  let body = '';
  let twilioResponse = await new Promise(resolve => {
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    const twiml = new MessagingResponse();
    twiml.message(`Hello, thanks for contacting Alpha.CA.gov! The nearest food bank to ${req.body} is the Sacramento County food bank at 3333 3rd Ave., Sacramento. Their website is http://www.foodlink.org/ you can reach them via phone at (916) 456-1980, directions: https://maps.google.com/maps?daddr=38.55248,-121.47032`);
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




