const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error(`L'e-mail "${v}" n'est pas valide`)
        }
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        unique: true,
        required: true
    },
    profilePic:{
        type: String,
    }
})

userSchema.methods.toJSON = function () {
    const user = this.toObject();

    delete user.password;
    delete user.authTokens;

    return user
}

userSchema.methods.generateAuthToken = async function() {
    const authToken = jwt.sign({ _id: this._id.toString() }, 'foo');
    await this.authTokens.push({ authToken });
    await this.save()
    return authToken;
}

userSchema.statics.findUser = async(email, password) => {
    const user = await USER.findOne({ email });
    if(!user) throw new Error(`L'e-mail n'existe pas`);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new Error('Erreur pas possible de se connecter');
    return user;
}

userSchema.pre('save', async function() {
    if(this.isModified('password')) this.password = await bcrypt.hash(this.password, 8);
});

const USER = mongoose.model('User', userSchema)

module.exports = USER