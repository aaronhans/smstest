const client = require('twilio')(process.env.TWILIOSID, process.env.TWILIOTOKEN);

let body = `hi`

exports.handler = async function http(req) {
  client.messages
  .create({
      body: `This is the ship that made the Kessel Run in ${(Math.random() * 100).toFixed(1)} parsecs?`,
      from: '+14156304521',
      to: '+19259899425'
    })
  .then(message => {
    console.log(message.sid)
    return {
      headers: {
        'content-type': 'text/html; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      body
    }
  });
    
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