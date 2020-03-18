const express = require("express");
const fs = require("fs"); 
const jsdom = require("jsdom");

const fetchHelper = require("../helpers/fetch");
const fileHelper = require("../helpers/file");

const readFile = fileHelper.readFile;
const readLineFromSourceList = fileHelper.readLineFromSourceList;
const retrieveArticle = fetchHelper.retrieveArticle;
const wrtieFile = fileHelper.writeFile;
const router = express.Router();
const { JSDOM } = jsdom;


// console.log('existSync', fs.existsSync(`./data/0.txt`));

// GET /data/{lineNo}
router.get("/:line", async (req, res) => {
  // TODO : Help function을 이용하여, 주어진 filename의 내용을 읽을 수 있도록 구현하세요.
  /*
   * fs.existsSync 를 이용하여, 존재하지 않는 파일에 대해서 에러 핸들링을 할 수 있어야 합니다.
   */
  const filename = await `./data/${req.params.line}.txt`;
  res.set("Content-Type", "application/json");

  const isFile = fs.existsSync(filename);
  if(isFile){
    return await readFile(filename)
    .then(data=>res.send(JSON.stringify({id:req.params.line, body: data, status : ''})))
    .catch(err => res.send(err))
  }else{
    res.send({id:req.params.line, status : 'nonexist'});
  }

  //res.send 할때 id, body, status를 각각

  // return await readFile(filename)
  // .then(data=>res.send(JSON.stringify({body: data})))
  // .catch(err=>res.send(err));
});

// POST /data/{lineNo}
router.post("/:line", async (req, res) => {
  const lineNo = req.params.line;

  // TODO : Help function을 이용하여, 주어진 filename에 내용을 저장할 수 있도록 구현하세요.
  /*
   * Hint : Helper function(readLineFromSourceList, retrieveArticle, wrtieFile)이 필요할 것 입니다.
   * 1) 주어진 lineNo를 통해, 해당 line에 존재하는 url를 얻는다.
   * 2) url을 통해, article contents를 얻어낸다. ( JSDOM을 이용하여, medium 블로그의 글 내용을 얻을 수 있도록 하세요.)
   * 3) 얻어낸 article contents를 저장한다. (ex : filename , data/${lineNo}.txt)
   */
  // const dom1 = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  // console.log(dom.window.document.querySelector("p").textContent); //hello world

  const readUrl = await readLineFromSourceList(lineNo);
  const readHtml = await retrieveArticle(readUrl);
  const dom = new JSDOM(readHtml);
  const articleInDom = dom.window.document.querySelector('#root article').textContent;
  
  await wrtieFile(`./data/${lineNo}.txt`, articleInDom)
  res.send('ok');

});

module.exports = router;






 // readLineFromSourceList(lineNo)
  // .then(url => retrieveArticle(url))
  // .then(블로그글=>writeFile(경로, 블로그글))