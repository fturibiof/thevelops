const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  personal_phone: {
    type: String,
    required: false
  },
  password:{
    type:String,
    required: true
  }
});
//Return model with created Schema
module.exports = User = mongoose.model('users', UserSchema);
