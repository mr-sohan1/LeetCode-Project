const validator = require("validator");

const validate = (data) => {

    const mandatoryField = ["firstname", "emailID", "password"];


    const isAllowed = mandatoryField.every((k) => {

        return Object.keys(data).includes(k);
    });


    if (!isAllowed)
        throw new Error("Some Field Missing");

    if (!validator.isEmail(data.emailID))
        throw new Error("Invalid Email");

    if (!validator.isStrongPassword(data.password))
        throw new Error("Weak Password");
};

module.exports = validate;