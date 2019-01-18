/* global describe, it, beforeEach, afterEach */
const request = require('supertest');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

const app = require('../src/server/index');

const studentsData = require('../student.json');

console.log(studentsData)
describe('server', () => {
  let tempSource;
  
  describe('student.json', function () {
    it('should put correct class on students.json', function() {
      let rawMessage = '기수를 숫자만! 입력해주세요! 예)10'
      expect(studentsData.theClass === rawMessage || studentsData.theClass === "").to.be.false
    })

    it('should put correct students on students.json', function() {
      let rawMessage = '스프린트를 진행하는 수강생분의 이름을 한글로! 적어주세요! 예)존도우, 제인도우'
      expect(studentsData.students === rawMessage || studentsData.students === "").to.be.false
    })
  });

  describe('GET', () => {
    it('/api/source should return 200 status code', (done) => {
      request(app).get('/api/source').expect(200, done);
    });

    it('/api/source should return the content of source.txt', (done) => {
      request(app)
        .get('/api/source')
        .then((res) => {
          const filepath = path.join(__dirname, '../', 'data/source.txt');

          fs.readFile(filepath, 'utf8', (e, data) => {
            tempSource = data;
            expect(res.text).to.equal(data);
            done();
          });
        });
    });

    it('/api/data/0 should return the content of the first saved, which is the content of the first url in source.txt', (done) => {
      request(app)
        .get('/api/data/0')
        .then((res) => {
          const filepath = path.join(__dirname, '../', 'data/0.txt');

          fs.readFile(filepath, 'utf8', (e, data) => {
            expect(res.body.body).to.equal(data);
            done();
          });
        });
    });
  });

  describe('POST', () => {
    function writeSource(source, callback) {
      const filepath = path.join(__dirname, '../', 'data/source.txt');
      fs.writeFile(filepath, source, {
        encoding: 'utf8',
        flag: 'w'
      }, (err) => {
        if (err) {
          return;
        }
        callback();
      });
    }
    const sample = 'https://medium.com/code-states/good-developer-1-%EC%A2%8B%EC%9D%80-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-5%EA%B0%80%EC%A7%80-%EA%B8%B0%EC%A4%80-b4b9f166caf7';

    beforeEach((done) => {
      const filepath = path.join(__dirname, '../', 'data/0.txt');
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      writeSource(sample, done);
    });

    afterEach((done) => {
      writeSource(tempSource, done);
    });

    it('/api/source should save the payload as source.txt file', (done) => {
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

  describe('REVIEW.md', () => {
    it('should review on REVIEW.md\n      Bare Minimum을 완료하셨다면 REVIEW.md를 작성하고 Pull request를 만든 뒤 Advanced 진행부탁드립니다!', function() {
      let rawFilepath = path.join(__dirname, 'raw_review.md')
      let studentFilepath = path.join(__dirname, '../REVIEW.md')

      let rawBuf = fs.readFileSync(rawFilepath);
      let studentBuf = fs.readFileSync(studentFilepath);
      expect(rawBuf.equals(studentBuf)).to.be.false
    })
  });
});
