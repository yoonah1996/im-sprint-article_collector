const express = require("express");
const app = express();
const fileHelper = require("../helpers/file");

const router = express.Router();


const readFile = fileHelper.readFile;
const writeFile = fileHelper.writeFile;

app.use(express.json())

// GET /source
router.get("/", async (req, res) => {
  // TODO: Help function을 이용하여, source.txt의 내용을 반환 수 있도록 구현하세요.
  const result = await fileHelper.readSourceListFile();
  res.status(200);
  res.send(result);
});

// POST /source
router.post("/", async (req, res) => {
  // TODO: Help function을 이용하여, source.txt의 내용으로 저장할 수 있도록 구현하세요.
  
  const result = await writeFile('./data/source.txt', req.body);
  res.status(200).send(result);
});

module.exports = router;
