const validator = require("validator");

const validate = (data) => {
  const mandatoryFields = ["firstName", "emailID", "password"];

  const isAllowed = mandatoryFields.every((field) =>
    Object.prototype.hasOwnProperty.call(data, field)
  );

  if (!isAllowed) {
    throw new Error("Some Field Missing");
  }

  if (!validator.isEmail(data.emailID)) {
    throw new Error("Invalid Email");
  }

  if (
    !validator.isStrongPassword(data.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol."
    );
  }
};

module.exports = validate;