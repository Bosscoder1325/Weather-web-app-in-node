const request = require("request");

const forecast = (latitude, logitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=598c37452e4bef0bf1653faa6ce2ff05&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(logitude)}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        `Todays weather is ${body.current.weather_descriptions[0]} and temperature is ${body.current.temperature} which feelslike ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
