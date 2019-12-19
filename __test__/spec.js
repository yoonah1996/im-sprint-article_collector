process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const mock = require('mock-fs');

const app = require('../src/server/index');

const fileHelper = require('../src/server/helpers/file');
const fetchHelper = require('../src/server/helpers/fetch');

describe('Bare Minimum Requirements', () => {
  describe('Helper function Test', () => {
    beforeEach(() => {
      mock({
        './data': {
          'source.txt': 'helloMocking\nhelloMocha\nhelloJavaScript'
        }
      });
    });

    afterEach(() => {
      mock.restore();
    });

    describe('readFile', () => {
      it('should get a contents in the `then` block', () => {
        return fileHelper.readFile('./data/source.txt').then(res => {
          expect(res).to.equal('helloMocking\nhelloMocha\nhelloJavaScript');
        });
      });
    });

    describe('writeFile', () => {
      it('should resolve a specific contents', async () => {
        await fileHelper.writeFile('./data/source.txt', 'byeMocking');
        return fs.readFile('./data/source.txt', (err, res) => {
          expect(err).to.equal(null);
          expect(res.toString()).to.equal('byeMocking');
        });
      });
    });

    describe('readLineFromSourceList', () => {
      it('should get a content by existed specific line number', () => {
        return fileHelper.readLineFromSourceList(2).then(res => {
          expect(res).to.be.equal('helloJavaScript');
        });
      });

      it('should return undefined if not existed line number', () => {
        return fileHelper.readLineFromSourceList(3).then(res => {
          expect(res).to.be.equal(undefined);
        });
      });
    });

    describe('retrieveArticle', () => {
      const sample =
        'https://medium.com/code-states/good-developer-1-%EC%A2%8B%EC%9D%80-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-5%EA%B0%80%EC%A7%80-%EA%B8%B0%EC%A4%80-b4b9f166caf7';

      it('should return article contents with html form', () => {
        return fetchHelper.retrieveArticle(sample).then(res => {
          expect(res).to.include('<!doctype html>');
        });
      });
    });
  });

  describe('server api test', () => {
    let tempSource = '';

    describe('GET', () => {
      it('/api/source should return 200 status code', done => {
        request(app)
          .get('/api/source')
          .expect(200, done);
      });

      it('/api/source should return the content of source.txt', done => {
        request(app)
          .get('/api/source')
          .then(res => {
            const filepath = path.join(__dirname, '../', 'data/source.txt');

            fs.readFile(filepath, 'utf8', (e, data) => {
              tempSource = data;
              expect(res.text).to.equal(data);
              done();
            });
          });
      });

      it('/api/data/0 should return the content of the first saved, which is the content of the first url in source.txt', done => {
        request(app)
          .get('/api/data/0')
          .then(res => {
            const filepath = path.join(__dirname, '../', 'data/0.txt');

            fs.readFile(filepath, 'utf8', (e, data) => {
              expect(!data).to.equal(false);
              expect(res.body.body).to.equal(data);
              done();
            });
          });
      });
    });

    describe('POST', () => {
      function writeSource(source, callback) {
        const filepath = path.join(__dirname, '../', 'data/source.txt');
        fs.writeFile(
          filepath,
          source,
          {
            encoding: 'utf8',
            flag: 'w'
          },
          err => {
            if (err) {
              return;
            }
            callback();
          }
        );
      }
      const sample =
        'https://medium.com/code-states/good-developer-1-%EC%A2%8B%EC%9D%80-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-5%EA%B0%80%EC%A7%80-%EA%B8%B0%EC%A4%80-b4b9f166caf7';

      beforeEach(done => {
        const filepath = path.join(__dirname, '../', 'data/0.txt');
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        writeSource(sample, done);
      });

      afterEach(done => {
        writeSource(tempSource, done);
      });

      it('/api/source should save the payload as source.txt file', done => {
        request(app)
          .post('/api/source')
          .set('Content-Type', 'text/plain')
          .send(sample)
          .then(() => {
            const filepath = path.join(__dirname, '../', 'data/source.txt');

            fs.readFile(filepath, 'utf8', (e, data) => {
              expect(sample).to.equal(data);
              done();
            });
          });
      });

      it('/api/data/0 should make a file contains the content of the first url in source.txt', function testcase(done) {
        this.timeout(7000);
        request(app)
          .post('/api/data/0')
          .then(() => {
            const filepath = path.join(__dirname, '../', 'data/0.txt');

            fs.readFile(filepath, 'utf8', (e, data) => {
              if (data.indexOf('Good Developer 1') !== -1) {
                done();
              }
            });
          });
      });
    });
  });
});
