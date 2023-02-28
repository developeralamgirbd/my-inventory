const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

exports.createToken = (payload)=>{
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '24h'
    });
}

exports.hashPassword = (password)=>{
    return bcrypt.hashSync(password);
}

exports.comparePassword = (password, hash)=>{
    return bcrypt.compareSync(password, hash);
}