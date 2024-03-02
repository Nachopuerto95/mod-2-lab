const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
    {
        message: {
            type: String,
            required: [true, 'Message is required']
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            require: true
        }
    },
    { timestamps: true }

)



const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;