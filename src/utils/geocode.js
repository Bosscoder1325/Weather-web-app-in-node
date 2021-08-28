const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYm9zc2NvZGVyIiwiYSI6ImNrc2VsdTh1cDExemkyb29kemJvaTUyaGUifQ.6Z98NdBcw-sL8BWgNc8sUQ&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("invalid location try searching valid one", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        logitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
