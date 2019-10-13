# Article Collector

## 이번 Sprint의 학습 목표

- CommonJS 패턴, 즉 `export`와 `require` statements를 이용해 well-organized codebase를 만든다.
- `fs` module을 활용해 파일을 다룰 줄 안다.
- `https` 또는 `http` module을 활용해 서버 상에서 HTTP 요청하는 법을 익힌다.
- HTTP server routing을 다루면서 웹 서버가 어떻게 작동하는지 이해한다.
- Node application을 디버깅 할 수 있다.


## Sprint를 시작하기 전 알고있어야 하는 것들

Sprint를 원활히 진행하기 위해 꼭 알고있어야하는 것들입니다.
아래 항목들 중 모르는 것이 있다면 Sprint를 시작하기 전 꼭 help-desk에 문의부탁드립니다.

- [ ] HTTP 요청과 응답에 관하여 알고있다.
- [ ] HTTP GET 및 POST 메소드에 대해 이해하고 있다.
- [ ] Content-Type이 무엇인지, 대표적인 Content-Type으로는 어떠한 것이 있는지 이해하고 있다.
- [ ] Content-Type을 HTTP 요청에서 어떻게 사용하는지 알고 있다.
- [ ] Node app에서의 비동기 요청과 callback을 이해하고 있다.
- [ ] Promise와 async / await의 관계를 이해하고 있다.

## Pair programming을 시작하기 전 혼자서 해볼 것들

본격적으로 Pair programming을 시작하기 전 아래 항목들을 먼저 확인해봅니다.

- [ ] 간단한 비동기 요청을 Promisify 해보고, async/await 형태로 바꿔보기

## Pair programming에서 같이 해볼 것들

- [ ] 프로젝트 구조를 파악하기
- [ ] retriveArticle 같이 구현해보기

## Advanced 한 과제들

- [ ] 매우 큰 파일(100MB 이상의 텍스트 파일)을 어떻게 불러올 수 있는지 알아보기
- [ ] 텍스트가 아닌 binary 형태의 파일(이미지)를 어떻게 불러올 수 있는지 알아보기
- [ ] Buffer, WritableStream, ReadableStream의 개념을 이해하고 사용해보기
- [ ] Web app에 업로드를 어떻게 할 수 있는지 알아보기


## Sprint 진행 방법

1. 현재 repo를 자신의 Github으로 fork 합니다.
2. fork된 repo를 git clone 명령어로 자신의 local 환경으로 다운로드합니다.
3. [student.json](student.json) 파일에 필요한 정보를 입력합니다.
4. 재밌게 coding을 시작합니다.

## 제출 방법
1. `npm run test`를 통해 작성된 코드를 테스트 합니다.
2. `npm run submit`을 통해 제출합니다. AWS serverless lambda를 통해 CI가 돌게 됩니다. 과제를 제출하기 전에 `npm run test`를 통해 테스트 결과를 업데이트 해주시기 바랍니다.


