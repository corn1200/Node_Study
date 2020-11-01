const express = require('express')
const model = require('./lib/mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('./10_29/public'))

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
  const { body: { id, pw, name } } = req
  model.User.create({ id, pw, name})
  res.redirect('/')
})

app.get('/users', async (req, res) => {
  const data = await model.User.find({})
  res.json(data)
})

const port = 8005
app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})
