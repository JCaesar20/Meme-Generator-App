const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true,
        validate: async(value) => {
            if (!validator.isEmail(value)) {
                throw {error: "Wrong format of an E-mail"}
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (validator.contains(value.toLowerCase(), 'password')) {
                throw {error: "Wrong format of Password"};
            }
        }

    },tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('memes',{
    ref: 'Meme',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateTokens = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 days' });
    user.tokens = user.tokens.concat({ token })
    await user.save() 
    return token;
}


userSchema.statics.findByCerdenalties = async (username, password) => {
    const user = await User.findOne({ username })

    if (!user) {
        throw {error:'Username not found'}
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw {error: 'Password is wrong'};
    }

    return user
}

userSchema.pre('save', async function (next) {
  
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User