const { Schema, model } = require('mongoose')

const commentSchema = Schema({
    content: { type: String, required: true },
    writer: { type: String, required: true },
    createAt: { type: Date, required: true, default: () => new Date() }
})

const postSchema = Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    writer: { type: String, required: true},
    comments: [commentSchema],
    createAt: { type: Date, required: true, default: () => new Date() },
    updateAt: { type: Date, required: true, default: () => new Date() },
    hit: { type: Number, required: true, default: 0}
})

const Post = model('post', postSchema)

module.exports = Post