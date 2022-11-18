const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    number: {
        type: Number,
    },
    first_name: {
        type: String,
    },
    gender: {
        type: String,
    },
    desc: {
        type: Array,
    }
})

const User = mongoose.model('User', userSchema);
module.exports = { User };