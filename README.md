# 10월 8일자 수업

# 1. Node.js 설치

우선 Node.js를 사용하기 위해

Link: [Node.js][nodelink]

[nodelink]: https://nodejs.org/en/ "Go Node.js"

해당 링크로 이동하여 최신버전의 Node.js LTS 버전을 다운로드합니다.

이미 10버전 이상의 Node.js가 설치되어 있다면 이 부분은 생략해도 좋습니다.

설치 확인을 위해 cmd를 실행하고 __node__ 입력해봅니다.

자신이 설치한 Node.js의 버전이 출력되면 안정적으로 설치가 완료된 것입니다.

추가적으로 __1 + 1__ 이나 __console.log(2)__ 등을 실행해보며 오류가 없나 확인해봅니다.

# 2. 폴더 생성과 작업 환경 설정

Node.js의 환경은 웹 브라우저의 console 환경과 유사합니다.

cmd로 접속한 node 환경에서 여러 동작을 시행해 보았고 문제가 없다면 이제 작업을 할 폴더를 생성해봅시다.

폴더명은 본인이 원하는 이름으로 설정하시고 해당 폴더 안에

* Node 폴더
  * index.js
  
위와 같은 형식으로 문서를 만들어주세요.

생성한 폴더의 터미널에 express 프레임워크를 install 해야합니다.

본인 폴더 위치에서 터미널을 열어 주시고 __npm install express__ 라고 입력하여 express 프레임워크를 해당 폴더 위치에 install 해줍니다.

* Node 폴더
  * node_modules
  * package-lock.json
  
위와 같이 폴더, 파일 한개씩 생성 되었다면 install에 성공한 것입니다.

# 3. 서버 동작

우린 express 프레임워크를 통해 Node.js를 서버로써 동작시킬 수 있습니다.

index.js 파일에

```
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('I am working!!')
})

app.get('/robot', (req, res) => {
    res.send('I am robot!!')
})

const port = 8000
app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})
```

해당 코드를 적어주세요.

express라는 변수에 우리가 install한 express 프레임워크에 대한 내용들을 저장합니다.

app변수에는 함수 형태로 저장된 express를 저장합니다.

app.get 부분에서 첫번째 매개변수 안에 서버로 접속할 때 어떤 통로를 거칠지 정하는 것입니다.

res는 get() 함수가 호출될 때 response를 받게될 것입니다.

이는 매개변수의 이름과는 관계가 없고 순서와 관계가 있습니다.

get() 함수에서 위 코드와 다르게 매개변수를 더 늘릴수도 더 줄일수도 있고 이러한 동작이 가능한건 오버로딩 기법 덕분입니다.

다만 보통은 위와 같은 매개변수로 받아 사용합니다.

res.send()로 웹 브라우저 response에 우리가 입력한 'I am working!!' 이나 'I am robot!!' 을 출력하게 됩니다.

이제 cmd에 __cd 폴더위치__ 를 입력하여 현재 작업중인 폴더로 이동을 시키고 __node index.js__ 입력하여 서버를 실행시켜 봅시다.

server is running on port: 8000 이라고 출력된다면 서버가 실행된겁니다.

Link: [your server][serverlink]

[serverlink]: "http://localhost:8000"

Link: [your server/robot][serverlink]

[serverlink]: "http://localhost:8000/public"

위 링크들을 클릭해서 서버가 실행되었는지 확인해봅시다.

# 4. 정적 파일

이제

```
app.get('/', (req, res) => {
    res.send('I am working!!')
})

app.get('/robot', (req, res) => {
    res.send('I am robot!!')
})
```

부분을 

```
app.use('/public', express.static('./public'))
```

로 바꾸고

* Node 폴더
  * public
    * index.html
  
위와 같은 형식으로 폴더와 그 안에 파일을 만들어줍니다.

index.html 안에는 아무 내용이나 적어도 좋고 눈에 띄일수록 좋습니다.

이제 cmd에서 ctr + c 를 두번 클릭하고 다시 __node index.js__ 를 입력하면 서버가 재시작 되며 변경된 내용이 저장될 겁니다.

Link: [your server/public][serverlink]

[serverlink]: "http://localhost:8000/public"

위 링크를 클릭하면 자신이 작성한 index.html 이 보일 것입니다.

하지만 어째서 index.html 파일을 지정하지도 않고 실행한 것 일까요?

이는 public 폴더의 index.html 파일의 이름과 관련이 있습니다.

웹에서는 __index__ 라는 이름이 굉장히 중요합니다.

다른 프로그래밍 언어의 예약어라고 생각해도 좋습니다.

localhost:8000/public 에 접속하면

```
app.use('/public', express.static('./public'))
```

해당 함수가 실행되는데 첫번째 매개변수는 서버로 통하는 통로(url)를 가르키는 것이고 두번째 매개변수 express.static('./public')) 은 express 오브젝트 즉, 우리가 install 한 express 프레임워크의 static이라는 함수를 실행 시키는 것입니다.

간단하게 이 함수의 내용은 매개변수로 받은 폴더 안의 index 라는 이름의 html 파일을 찾는다고 생각하면 됩니다.

그렇기 때문에 index.html의 파일 위치를 지정하지 않아도 함수로 자동 지정이 된 것입니다.

# 읽을거리