const express = require('express')
const crypto = require('crypto')
const session = require('express-session')
const methodOverride = require('method-override')

require("./lib/mongoose")
const User = require('./models/user')
const Post = require('./models/post')
const app = express()

app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('./12_17/public'))
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
    res.render('index', { user: req.session.user })
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/posts', async (req, res) => {
  const posts = await Post.find({ })
  res.render('posts', { posts })
})

app.get('/posts/create', (req, res) => {
  if(!req.session.user) return res.redirect('/login')
  res.render('createPost')
})

app.get('/posts/:postId', async (req, res) => {
  // 메모리를 덜 먹음(호출량이 적음)
  // const postId = req.params.postId
  const { params: { postId } } = req
  const post = await Post.findOneAndUpdate({_id: postId}, { $inc: { hit: 1 } }, { new: true })
  const user = req.session.user
  res.render('postDetail', { post, user })
})

app.get('/posts/:postId/modify', async (req, res) => {
  const { params: { postId } } = req
  const post = await Post.findOne({_id: postId})
  res.render('updatePost', { post })
})

app.post('/posts/:postId/comments', async (req, res) => {
  const { params: { postId }, body: { content }  } = req
  await Post.updateOne({
    _id: postId 
  }, { 
    $push: { 
      comments: {
        content,
        writer: req.session.user._id
      } 
    } 
  })
  res.redirect(`/posts/${postId}`)
})

app.put('/posts/:postId', async (req, res) => {
  const { params: { postId }, body: { title, content } } = req
  await Post.updateOne({ _id: postId }, { title, content })
  res.redirect(`/posts/${postId}`)
})

app.delete('/posts/:postId', async (req, res) => {
  const { params: { postId } } = req
  await Post.deleteOne({ _id: postId })  
  res.redirect('/posts')
})

app.post('/posts', (req, res) => {
  if(!req.session.user) return res.redirect('/login')
  const { body: { title, content } } = req
  Post.create({ title, content, writer: req.session.user._id })
  return res.redirect('/posts')
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
