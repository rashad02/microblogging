const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    commenterId: {
        type: String,
    },
    commentedAt: {
        type: Date,
        default: new Date()
    },
    files:{
        type: Array,
        optional: false,
        unique: false
    },
    numberOfLikes: {
        type: String,
        required: false
    },
    replyIds:{
        type: Array, 
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
