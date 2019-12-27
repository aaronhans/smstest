
exports.handler = async function http(req) {
  const MessagingResponse = require('twilio').twiml.MessagingResponse;
  const twiml = new MessagingResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  let body = twiml.toString();

  /*
  // this works great
  // let body = `hi`;
  const client = require('twilio')(process.env.TWILIOSID, process.env.TWILIOTOKEN);
  console.log('attempting to connect to twilio')

  let twilioResponse = await new Promise(resolve => {
    client.messages
    .create({
        body: `This is the ship that made the Kessel Run in ${(Math.random() * 100).toFixed(1)} parsecs?`,
        from: '+14156304521',
        to: '+19259899425'
      })
    .then(message => {
      console.log('connected to twilio')
      console.log(message.sid)
      resolve('completed')
    });        
  });

  console.log('response is '+twilioResponse)
  */
  return {
    headers: {
      'content-type': 'text/xml; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body
  }
}

// Example responses
/* Respond with successful resource creation, CORS enabled
let arc = require('@architect/functions')
exports.handler = arc.http.async (http)
async function http (req) {
  return {
    statusCode: 201,
    headers: {'content-type': 'application/json; charset=utf8'},
    body: JSON.stringify({ok: true}),
    cors: true,
  }
}
*/