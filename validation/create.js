const Validator = require('validator');
const isEmpty = require('lodash.isempty');

module.exports = function validateInputCreate(inputData) {
  let errors = {};

  if (!Validator.isLength(inputData.first_name, {min: 2, max:20})) {
    errors.first_name = "First name must be between 2 and 20 characters";
  }
  if (!Validator.isLength(inputData.last_name, {min: 2, max:20})) {
    errors.last_name = "Last name must be between 2 and 20 characters";
  }
  if (!Validator.isLength(inputData.password, {min: 6, max:20})) {
    errors.password = "Password must be between 6 and 20 characters";
  }
  if (!Validator.isEmail(inputData.email)) {
    errors.email = "Invalid email";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
