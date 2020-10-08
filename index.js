const express = require('express')
// 다운로드한 express 모듈을 불러옴
const app = express()
// express에 저장한 함수 실행

app.use('/public', express.static('./public'))

const port = 8000
app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
    // `는 줄내림과 변수를 표현할 수 있다
})

// app.get('/', (req, res) => {
//     res.send('I am working!!')
// })

// app.get('/robot', (req, res) => {
//     // get으로 post값을 받는다
//     res.send('I am robot!!')
// })

// localhost는 자기 컴퓨터를 가르킨다
// require는 module.export를 불러온다
// js파일은 확장자를 숨길 수 있다
// console는 object다
// var는 반복적으로 정의할 수 있고 문제가 많다
// let도 반복적으로 정의할 수 있다 하지만 let은 중괄호 범위 안에서만 작동한다
// const는 절대로 바뀌지 않는다