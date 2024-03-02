const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        username: {
            type: String,
            required: [true,'Username is required'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: 10
        },
        avatar: {
            type: String,
            default: "https://i.pravatar.cc/150?u=iron-fake@pravatar.com"
        }
    },
    {timestamps: true}
);

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt  
            .hash(this.password, 2)
            .then((hash) => {
                this.password = hash
                next()
            })
            .catch(next)
    } else {
        next()
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;