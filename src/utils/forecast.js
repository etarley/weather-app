const request = require('postman-request');

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=dedd76b4ae993b786fd0fc43eed9b561&query=${lat},${long}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.error) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;
      callback(
        undefined,
        `${weather_descriptions} It's currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
      );
    }
  });
};
module.exports = forecast;
