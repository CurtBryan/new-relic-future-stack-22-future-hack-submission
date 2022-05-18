const axios = require("axios");

// * This function is being used by me as a express function in a NodeJS App
// * but can easily be modified to be another twilio function. Just at scale, 
// * Twilio functions will not work because of the 30 second timeout. 
const dialerTrigger = async (req, res, next) => {
  try {
    const { numbers } = req.body;
    let misconfiguredNumsCounter = 0;
    numbers.forEach((number) => {
      if (
        number.split("")[0] !== "+" ||
        number.split("")[1] !== "1" ||
        number.length !== 12
      ) {
        misconfiguredNumsCounter = misconfiguredNumsCounter + 1;
      }
    });
    if (misconfiguredNumsCounter !== 0)
      throw {
        message:
          "Please provide values in body field 'numbers' as an array of strings in +1 and ten digit number format",
        status: 400,
      };
    if (!numbers || numbers.length < 1) {
      throw {
        message:
          "Please provide values in body field 'numbers' as an array of strings",
        status: 400,
      };
    }
    await Promise.all(
      numbers.map(async (number) => {
        try {
          const dialerPayload = {
            method: "post",
            url: "https://power-dialer-9743.twil.io/dial",
            data: {
              number,
            },
          };
          await axios(dialerPayload);
        } catch (error) {
          throw error;
        }
      })
    );
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(err?.status || 500).send(err?.message || err.toString());
  }
};

module.exports = { dialerTrigger };
