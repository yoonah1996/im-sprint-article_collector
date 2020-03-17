const fs = require("fs");


async function writeFile(filename, body) {
  return new Promise((resolve, reject) => {
    // TODO: 특정 파일이름(filename)을 가진 텍스트를 저장할 수 있도록 구현하세요.
    fs.writeFile(filename, body, (err) => {
      if(err){
        reject(err);
      }else{
        resolve(body);
      }
    })
  });
}

async function readFile(filename) {
  return new Promise((resolve, reject) => {
    // TODO: 특정 파일이름(filename)을 가진 텍스트를 읽을 수 있도록 구현하세요.
    fs.readFile(filename, 'utf8' , (err, data) => {
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  });
}
//source.txt파일을 읽는다.
async function readSourceListFile() {
  return readFile("./data/source.txt");
}
//source.txt파일에 글을 쓴다.
async function writeSourceListFile(body) {
  return writeFile("./data/source.txt", body);
}
//source.txt파일의 n번째 줄을 읽는다.
async function readLineFromSourceList(nthline) {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/source.txt', 'utf8' , (err, data) => {
      if(err){
        reject(err)
      }else{
        resolve(data.split('\n')[nthline])
      }
    })
  });
}

module.exports = {
  readSourceListFile,
  writeSourceListFile,
  writeFile,
  readFile,
  readLineFromSourceList
};
