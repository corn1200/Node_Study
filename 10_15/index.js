// ;(async function () {
//     console.log(1)
//     await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(2)
//         resolve()
//       }, 1000)
//     })
//     console.log(3)
//   })()

// 함수 앞에 async 를 붙여서 비동기 함수를 만들 수 있다
// 비동기를 사용하는 이유 await, Promise
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('./10_15/public'))

app.post('/robot', function (req, res) {
  const { body: { id, pw} } = req
  res.send(`title is ${id} name is ${pw}`)
})

app.post('/robot2', function (req, res) {
  res.send('I am robot2')
})

const port = 8005
app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})

// 노드를 쓸 수 있는 라이센스가 있다 예: MIT

// js에서 객체와 오브젝트는 다른 개념
// undefind 에서 요소를 찾으면 오류가 난다