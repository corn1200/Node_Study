# 10월 8일자 수업

# 1. Node.js 설치

우선 Node.js를 사용하기 위해

Link: [Node.js][nodelink]

[nodelink]: https://nodejs.org/en/ "Go Node.js"

해당 링크로 이동하여 최신버전의 Node.js LTS 버전을 다운로드합니다.

이미 10버전 이상의 Node.js가 설치되어 있다면 이 부분은 생략해도 좋습니다.

설치 확인을 위해 cmd를 실행하고 __node__ 를 입력해봅니다.

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
## Node.js에 대하여

Node.js 공식 사이트에선 자신들을

__"비동기 이벤트 주도 javaScript 런타임으로써 Node.js 는 확장성 있는 네트워크 애플리케이션을 만들 수 있도록 설계되었습니다."__ 

라고 소개하고 있습니다.(한글문서 기준)

그렇다면 비동기 이벤트(+1)는 무엇이고 런타임(+2)은 무엇이고 확장성(+3), 네트워크 애플리케이션(+4)은 무엇일까요?

이 모든 걸 설명하기엔 지금 당장 웹 전반과 시스템 동작의 기본까지 내려가야 하는 참사가 벌어질 수도 있기에 요약을 할 필요가 있습니다.

1. 비동기 이벤트
   
   우선 기존의 시스템과 Node.js의 구조 차이를 알아야합니다.

   기존의 서버들은 Blocking I/O 라는 입출력 시스템을 사용하여 멀티 스레드 방식으로 멀티 태스킹을 구현할 수 밖에 없었습니다.

   멀티 스레드 방식에 단점과 함께 장점도 있지만 서버 구동에서 단점이 치명적으로 다가옵니다.

   동시에 여러 요청을 받을 시 멀티 스레드는 요청들을 스케줄링 하여 각 요청이 CPU에서 처리되는 시간을 조정합니다.

   모든 요청이 처리될 때 까지, 혹은 한가지 요청이 처리될 때 까지 애플리케이션은 Blocked 상태. 즉, (I/O, 입출력 혹은 요청을 실행하느라) 멈춰있는 상태라고 생각하면 됩니다.

   이러한 방식이 요청이 많아지는 서버에서 감당하기 힘들고 멀티 태스킹을 위해 CPU를 나눠 쓰기 위해 스케줄링을 하는데도 자원이 소모되니 특정 조건에서 최악의 경우를 보여주게 됩니다.

   Node.js는 이를 해결할 수 있는 구조를 가지고 있습니다.

   Node.js는 싱글 스레드와 이벤트 루프라는 구조를 가지고 있습니다.

   이를 통해 javaScript의 callback 이라는 강점을 살려서 이벤트 루프가 계속 이벤트(I/O, 입출력 또는 요청)를 확인하면서 해당 이벤트가 실행되면 실행이 완료되길 기다리지 않고 워커 스레드라는 장소를 마련하여 별개로 이벤트를 실행시킨다.

   또한, 이벤트가 끝나는걸 기다리지 않고 이벤트 루프가 다시 해당 이벤트로 돌아가지 않고 다른 요청을 기다린다.

   바로 callback을 사용하여 미리 정의해둔 함수가 이벤트의 실행 이후에 호출되어 남은 작업을 완료하도록 구현하는 것이다.

   정리하자면 Node.js로 구현된 애플리케이션은 동기적으로 하나의 요청 혹은 이벤트를 붙잡고 끝날 때 까지 멈춰 있는 것이 아닌 비동기적으로 요청 혹은 이벤트 발생시 단지 실행(워커 스레드)만 시키고 애플리케이션은 동작을 멈추지 않습니다.

   정리하자면 비동기 이벤트는 애플리케이션의 동작을 멈추지 않는 이벤트이고 비동기 이벤트를 주도하는 Node.js가 해당 이벤트를 실행만 시킬 뿐이며 애플리케이션이 해당 이벤트를 끝까지 주관하지 않고 실행 후에 애플리케이션에 callback으로 작업을 되돌려 줄 뿐입니다.

2. 런타임
   
   런타임은 프로그래밍 언어가 구동되는 환경이라고 이해를 하면 됩니다.

3. 확장성
   
   확장성이란 비즈니스 요구 사항에 맞게 확장 하는 시스템의 기능입니다. 기존의 응용 프로그램은 응용 프로그램 대로 확장된 프로그램이 정상적으로 동작하는 기준이기도 합니다.

4. 네트워크 애플리케이션
   
   네트워크 애플리케이션은 두 단어를 나눠서 설명 드리겠습니다.

   네트워크는 컴퓨터들 끼리 통신 기술을 이용하여 그물망처럼 연결된 통신 이용 형태를 의미합니다.

   애플리케이션은 넓은 의미에서는 운영 체제에서 실행되는 모든 소프트웨어를 뜻합니다.

   둘이 합쳐지면 컴퓨터 사이에 통신 기술을 이용하여 상호작용하는 소프트웨어라고 볼 수 있습니다.

그렇다면

__"비동기 이벤트 주도 javaScript 런타임으로써 Node.js 는 확장성 있는 네트워크 애플리케이션을 만들 수 있도록 설계되었습니다"__

의 의미는

__"작업이 끝날 때 까지 기다리지 않는 javaScript 프로그래밍 환경으로써 Node.js 는 비즈니스 요구 사항에 맞게 응용 프로그램 영역을 넓혀가면서 컴퓨터 사이 상호 통신 소프트웨어를 만들 수 있도록 설계되었습니다."__

라고 해석할 수 있습니다.

## javaScript의 접근 제어자에 대하여

javaScript에는 var, const 등 접근 제어자 역할을 하는 예약어가 있습니다.

1. var
   
   var는 쉽게 말해 어디에서나, 계속 이용될 수 있습니다.

   예를 들어,

   ```
   if(조건문) {
     var a = 5;
   }

   console.log(a)
   ```

   위 코드에서 a는 정상적으로 출력됩니다.

   즉, 조건문 내에서 정의된 a의 수명이 조건문 내에서 종료되는게 아니라 계속해서 사용할 수 있게 되는 겁니다.

2. const

   const는 쉽게 말해 한번 값이 정해지면 다시는 값을 새로 저장할 수 없습니다.

   ```
   const a = 5;

   a = 7;
   ```

   위 코드에서 a의 선언 이후 a에 값을 7로 초기화할 때 오류가 납니다.

## 콜백에 대하여

콜백은 어쩌면 javaScript와 .js 파생 시스템들의 가장 핵심이자 중요한 개념이 아닐까 생각합니다.

```
function a (value, callback) {
  console.log('I got ' + value)
  callback()
}

a('root', function() {
  for (i 반복 10번)
    console.log('I am number ' + i)
})
```

위 코드를 차근차근 해석해보면서 콜백의 핵심을 짚어봅시다.

```
function a (value, callback) {
```

함수 a를 선언하였고 두 개의 매개변수를 받을 것입니다.

javaScript에도 명백히 데이터 타입이 존재합니다.

다만, 타입을 명시하지 않기 때문에 달랑 매개변수명만 있는 걸 보고 미리 정의한 변수를 가져다 쓴게 아닌가 하는 착각이 들 수 있습니다.

집중력을 발휘해서 콜백을 공부하는 내내 두 매개변수가 이전에 정의된 변수를 가져다 쓴게 아닌것이란걸 인지해야합니다.

마치 Java의

```
public void a (타입 value, 타입 callback) {

}
```

같다고 생각하시면 됩니다.

```
console.log('I got ' + value)
  callback()
}
```

위 코드를 보면 매개변수로 받은 value 값과 callback이 활용됩니다.

value의 위치와 형태를 보았을 때 어떠한 값이 들어갈 수 있을까요?

정수나, 문자가 들어갈 수 있겠네요.

그렇다면 callback의 위치와 형태를 보았을 때 어떠한 값이 들어갈 수 있을까요?

javaScript의 특징 중 하나는 변수에 함수를 넣을 수 있다는 겁니다.

매개'변수'인 callback의 뒤에 괄호() 가 붙었습니다.

이는 callback이 함수로써 실행되어야 한다는 걸 의미하고, 또 callback 매개변수에는 함수가 들어와야 한다는 걸 증명하는 것이나 마찬가지입니다.

그럼 a를 호출하는 부분을 봅시다.

```
a('root', function() {
  for (i 반복 10번)
    console.log('I am number ' + i)
})
```

위 코드를 보았을 때 매개변수 value에는 root라는 문자를 값으로 주었습니다.

매개변수 callback에는 I am number '0~9' 라고 출력하는 함수를 값으로 주었습니다.

다시 구현부를 봅시다.

```
console.log('I got ' + value)
callback()
```

우선 매개변수 value 값을 사용하여 console.log를 실행하겠네요.

'I got root' 가 출력됩니다.

이후엔 매개변수 callback 이라는 함수를 실행해야합니다.

'I am number 0'

'I am number 1'

'I am number 2'

. . .

'I am number 9'

위와 같이 출력될 것입니다.

그럼 만약 callback 값에 숫자나 문자 값을 주면 어떻게 될까요?

함수 a에서 매개변수 callback을 함수로써 실행했기에 함수로써 실행될 수 없는 숫자나 문자가 들어오면 오류를 일으킵니다.

정말 간단하게 콜백을 살펴보자면 이런 용도가 있고 이정도 방법이 있다고 설명할 수 있습니다.

하지만, 실제로 콜백의 용도와 구현 방법은 무궁무진하고 javaScript나 js 파생 시스템 계열에서 너무도 흔한 프로그래밍 기법입니다.

만약, 콜백의 용도를 Node.js 에 대한 내용과 함께 알고 싶다면 위에 있는 'Node.js에 대하여'를 읽어주세요.

# 10월 15일자 수업
await promise async resolve reject 비동기함수 동기함수
get post
app.use(express.json())
Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.urlencoded())
Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
nodemon