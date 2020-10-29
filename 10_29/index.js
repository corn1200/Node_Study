const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('./10_22/public'))

const users = [{
  id: 'teemo1',
  pw: 'teemo2',
  name: 'top'
}]

app.post('/login', function (req, res) {
  const { body: { id, pw} } = req
  for(let i = 0; i < users.length; i++) {
    if(users[i].id === id && users[i].pw === pw) {
      res.send(`login success ${id} ${pw}`)
    }
  }
  res.send(`login failed ${id} ${pw}`)
})

app.post('/registry', function (req, res) {
  const { body: { id, pw, name, sex} } = req
  users.push({ id, pw, name, sex })
  // js에서 const 배열에 push를 하는건 문제가 없다
  res.send(`회원가입이 완료되었습니다. ${id} ${pw} ${name} ${sex}`)
})

app.get('/users', (req, res) => {
  res.json(users)
})

const port = 8005
app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})