const https = require('https');

async function retrieveArticle(url) {
  // TODO: retrieve the html string from given url and return as promise
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // console.log(res)
      res.on('data', (d) => {
        // process.stdout.write(d)
        // console.log(d.toString());
        resolve(d.toString());
      })
      .on('error', (e) => {
        reject(e);
      })
    })
  })
}

// https.get('https://medium.com/code-states/good-developer-1-%EC%A2%8B%EC%9D%80-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-5%EA%B0%80%EC%A7%80-%EA%B8%B0%EC%A4%80-b4b9f166caf7', (res) => {
//   // console.log(res)
//   res.on('data', (d) => {
//     // process.stdout.write(d)
//     console.log(d.toString());
//   })
// })

module.exports = {
  retrieveArticle
};
