const fs = require('fs');

async function writeFile(filename, body) {
  return new Promise((resolve, reject) => {
    // TODO: read the content with specific filename
  });
}

async function readFile(filename) {
  return new Promise((resolve, reject) => {
    // TODO: save the content with specific filename
  });
}

async function readSourceListFile() {
  return readFile('./data/source.txt');
}

async function writeSourceListFile(body) {
  return writeFile('./data/source.txt', body);
}

async function readLineFromSourceList(nthline) {
  return new Promise((resolve, reject) => {
    // TODO : read line via specific nthline
  });
}

module.exports = {
  readSourceListFile,
  writeSourceListFile,
  writeFile,
  readFile,
  readLineFromSourceList
};
