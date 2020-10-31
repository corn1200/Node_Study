const { connect, Schema, model} = require('mongoose')

connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('MongoDB is connected')
})

const userSchema = Schema({
    id: { type: String, required: true, unique: true},
    pw: { type: String, required: true},
    name: { type: String, required: true},
    school: { type: String, default: '디지텍'},
    age: { type: Number, required: true, default: 18},
    isMarried: { type: Boolean, default: false},
    isDead: { type: Boolean, default: false}
})

const userModel = model('user', userSchema)

module.exports = {
    User: userModel
}