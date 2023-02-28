const validator = require("validator");

class RequestHelper{

    passwordCheck = (password)=>{
        return validator.isStrongPassword(password, {
            minLength: 8,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 1
        })
    }
}

const {passwordCheck} = new RequestHelper()

module.exports = {passwordCheck};