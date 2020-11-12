const express = require('express')
const model = require('./lib/mongoose')
const app = express()
const crypto = require('crypto')

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('./11_12/public'))
app.use((req, res, next) => {
  console.log('req.path : ', req.path)
  next()
})

let session = null;

app.post('/login', async function (req, res) {
  const { body: { id, pw} } = req

  const EPW = crypto.createHash('sha512').update(id + 'd!6b&^a' + pw).digest('base64')

  const data = await model.User.find({id, pw: EPW})

  if (data.length) {
    return res.redirect('/')
  }

  res.send(`login failed`)
})

app.post('/registry', function (req, res) {
  const { body: { id, pw, name } } = req

  // encryptedPassword
  const EPW = crypto.createHash('sha512').update(id + 'd!6b&^a' + pw).digest('base64')
  model.User.create({ id, pw: EPW, name })

  res.redirect('/')
})

app.get('/users', async (req, res) => {
  const data = await model.User.find({}, { pw: 0})
  res.json(data)
})

const port = 8005
app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})
