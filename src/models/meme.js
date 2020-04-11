const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    }, url: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Meme = mongoose.model('Meme',memeSchema)

module.exports = Meme