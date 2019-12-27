exports.handler = async function http (req) {

  let body = '';
  let twilioResponse = await new Promise(resolve => {
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    const twiml = new MessagingResponse();
    twiml.message('The Robots are coming! Head for the hills!');
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




