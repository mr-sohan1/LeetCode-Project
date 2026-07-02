const validator = require("validator");

const validate = (data) => {

    console.log("BODY =", data);

    const mandatoryField = ["firstname", "emailID", "password"];

    console.log("mandatoryField =", mandatoryField);
    console.log("keys =", Object.keys(data));

    const isAllowed = mandatoryField.every((k) => {
        console.log(k, Object.keys(data).includes(k));
        return Object.keys(data).includes(k);
    });

    console.log("isAllowed =", isAllowed);

    if (!isAllowed)
        throw new Error("Some Field Missing");

    if (!validator.isEmail(data.emailID))
        throw new Error("Invalid Email");

    if (!validator.isStrongPassword(data.password))
        throw new Error("Weak Password");
};

module.exports = validate;