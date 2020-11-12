const express = require('express')
const User = require('./models/user')
const app = express()
const crypto = require('crypto')
require("./lib/mongoose")

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('./11_12/public'))
app.use((req, res, next) => {
  console.log('req.path : ', req.path)
  next()
})

let session = null;

app.post('/login', async function (req, res) {
  if (session) return res.send('로그인 이미됨')

  const { body: { id, pw} } = req

  const EPW = crypto.createHash('sha512').update(id + 'd!6b&^a' + pw).digest('base64')

  const data = await User.find({id, pw: EPW})

  if (data.length) {
    session = id
    console.log(session)
    return res.redirect('/')
  }

  res.send(`login failed`)
})

app.post('/registry', function (req, res) {
  const { body: { id, pw, name } } = req

  // encryptedPassword
  const EPW = crypto.createHash('sha512').update(id + 'd!6b&^a' + pw).digest('base64')
  User.create({ id, pw: EPW, name })

  res.redirect('/')
})

app.get('/users', async (req, res) => {
  const data = await User.find({}, { pw: 0})
  res.json(data)
})

app.get('/logout', function (req, res) {
  session = null;
  return res.redirect('/')
})

const port = 8005
app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})
