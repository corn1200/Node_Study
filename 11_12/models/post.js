const { Schema, model } = require('mongoose')

const userSchema = Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    writer: { type: String, required: true},
    comment: { type: String, default: false},
    createAt: { type: Number, required: true},
    updateAt: { type: Number, default: false}
})

const Post = model('post', userSchema)

module.exports = Post