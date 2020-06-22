const https = require("https");

const request = {};

httpGet = (uri, api) => {
  return new Promise((resolve, reject) => {
    https.get(uri + api, (resp) => {
      let data = '';
  
      resp.on('data', (chunk) => {
        data += chunk;
      });
  
      resp.on('end', () => {
        if (data && resp.statusCode == 200) {
          resolve(JSON.parse(data));
        } else {
          resolve({})
        }
      });
    }).on("error", (error => reject(error)));
  });
}

request.httpGet = httpGet;

module.exports = () => request;
