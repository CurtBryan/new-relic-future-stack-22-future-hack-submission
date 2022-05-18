
// This is your new function. To start, set the name and path on the left.

exports.handler = function (context, event, callback) {
    // Here's an example of setting up some TWiML to respond to with this function
    console.log(event.AnsweredBy);
    console.log(event.number);
    const from = '+16234001763';
    const to = event.number;
  
    if (event.AnsweredBy !== "human") {
      let textClient = context.getTwilioClient();
      twilioClient.messages
        .create({ body: "Can you give us a call back?", to, from })
        .then((message) => {
          console.log('SMS successfully sent');
          console.log(message.sid);
          // Make sure to only call `callback` once everything is finished, and to pass
          // null as the first parameter to signal successful execution.
          return callback(null);
        })
        .catch((error) => {
          console.error(error);
          return callback(error);
        });
    } else {
  
  
      let twiml = new Twilio.twiml.VoiceResponse();
      twiml.enqueue({
        workflowSid: 'WW37ee04520beca3a3ad9449ccb3ac6fb0'
      });
  
      // This callback is what is returned in response to this function being invoked.
      // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
      // Or you might return JSON data to a studio flow. Don't forget it!
      return callback(null, twiml);
    }
  };