const express = require('express')
const crypto = require('crypto')
const session = require('express-session')

require("./lib/mongoose")
const User = require('./models/user')
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('./11_19/public'))
app.use((req, res, next) => {
  console.log('req.path : ', req.path)
  next()
})
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)
app.use(session({
  secret: 'ejs',
  resave: false,
  saveUninitialized: true
}))

app.get('/', (req, res) => {
    console.log(req.session.user)
    res.render('main', { user: req.session.user })
})

app.get('/posts', (req, res) => {
  res.render('posts', { user: req.session.user })
})

app.post('/login', async function (req, res) {
  const { body: { id, pw} } = req

  const EPW = crypto.createHash('sha512').update(id + 'd!6b&^a' + pw).digest('base64')

  const data = await User.findOne({id, pw: EPW})

  if (data) {
    req.session.user = data
    return res.redirect('/')
  }

  res.send(`login failed`)
})

app.post('/registry', function (req, res) {
  const { body: { id, pw, name } } = req

  const EPW = crypto.createHash('sha512').update(id + 'd!6b&^a' + pw).digest('base64')
  User.create({ id, pw: EPW, name })

  res.redirect('/')
})

app.get('/users', async (req, res) => {
  const data = await User.find({}, { pw: 0})
  res.json(data)
})

app.get('/logout', function (req, res) {
  delete req.session.user
  res.redirect('/')
})

const port = 8005
app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})
