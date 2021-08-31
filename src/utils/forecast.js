const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=96bed0f68017a8fe1e371f901588579c&query=${longitude},${latitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions, humidity } = body.current;
      callback(undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out, The humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
