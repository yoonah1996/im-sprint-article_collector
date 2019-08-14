const { exec } = require("child_process");
const https = require("https");

// Get sutdent data from student.json
let studentInfo = require("../student.json");
let { theClass, student, sprint } = studentInfo;

exec(
  'npm test | grep -E "[0-9]+\\s(passing|failing)"',
  (err, stdout1, stderr) => {
    if (err) {
      throw new Error("테스트를 실행하는데 에러가 발생했습니다.");
    }

    // Get test result from the console and cleasing it for spread sheet
    let matchWithPassing = stdout1.match(/([.\d,]+)[ ]+passing/);
    let matchWithFailing = stdout1.match(/([.\d,]+)[ ]+failing/);
    let passing = matchWithPassing ? Number(matchWithPassing[1]) : 0;
    let failing = matchWithFailing ? Number(matchWithFailing[1]) : 0;

    console.log('테스트 결과입니다.\n', `통과된 테스트: ${passing}`, `통과되지 못한 테스트: ${failing}`)

    const options = {
      hostname: "dnl7koxsek.execute-api.ap-northeast-2.amazonaws.com",
      path: "/default/im-submit",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    };

    const result = new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let data = '';

        if (res.statusCode === 500) {
          throw new Error("There is an error on submiting")
        }

        res.on("data", chunk => {
          data += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(data.toString()))
        });
      });
  
      req.on("error", e => {
        throw new Error("data did not submit correctly");
      });
  
      // send the request
      req.write(
        JSON.stringify({
          fields: {
            class: theClass,
            name: student,
            sprint: sprint,
            passed: passing,
            failed: failing
          }
        })
      );
      req.end();
    })

    result.then(result => {
      if (failing !== 0) {
        console.log('정상적으로 제출이 되었지만 통과하지 못한 테스트가있습니다.\n테스트가 모두 통과할 수 있도록 도전해보세요!')
      } else {
        console.log('정상적으로 제출이 되었습니다.')
      }
    }).catch(error => {
      console.log('제출이 실패했습니다. 다시 한 번 제출해주세요.')
    })
  }
);