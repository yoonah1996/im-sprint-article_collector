const https = require('https');
// const http = require('http'); 


// 다시
async function retrieveArticle(url) {
  // TODO: retrieve the html string from given url and return as promise
  
  return new Promise((resolve, reject)=>{
    https.get(url, (res)=>{
      
    let body = [];
res.on('error', (err) => {
        reject(err);
    })
    .on('data', (chunk) => {
        body.push(chunk);
    })
    .on('end', () => {
        body = Buffer
            .concat(body)
            .toString();
            resolve(body);
            // console.log(body);
        // 여기서 헤더, 메서드, url, 바디를 가지게 되었고 이 요청에 응답하는 데 필요한 어떤 일이라도 할 수 있게 되었습니다.
    });



    })
  })

  // return new Promise((resolve, reject)=>{
  //   https.get(url, (res)=>{
      
  //     res.on('data', (d) => {
  //       process.stdout.write(d);
  //       // console.log(d.toString());
  //       return resolve(d.toString());
  //     })
  //   })
  //   .on('end', () => {
  //     body = Buffer.concat(body).toString();
      
  //   })
  //   .on('error', (e) => {
  //     reject(e);
  //   })
  // })
}




module.exports = {
  retrieveArticle
};
