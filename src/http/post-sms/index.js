exports.handler = async function http (req) {
  const MessagingResponse = require('twilio').twiml.MessagingResponse;
  const twiml = new MessagingResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  let body = twiml.toString();

  return {
    headers: {
      'content-type': 'text/xml; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body
  }
}




