const https = require('https'); //url의 html을 가져 올수 있다.
// const http = require('http'); 


// 다시
async function retrieveArticle(url) {
  // TODO: retrieve the html string from given url and return as promise

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {

      let body = [];
      res.on('error', (err) => {
        reject(err);
      }) // html을 처음부터 끝까지 가져오기 위해서 .on('data',()).on('end',()) 까지 써줘야 모든 내용을 가져 올수 있다( 아니면 중간에 짤림. )
        .on('data', (chunk) => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();
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
