const mongoose = require('mongoose');

// mongoose.ObjectId.get(v => v == null ? v : v.toString())

const UserSchema = new mongoose.Schema({
  _id: { type : String, default: new String() },
  name:{
    type: String,
    required: [true, 'Please add your first name']
  },
  // lastName:{
  //   type: String,
  //   required: [true, 'Please add your last name']
  // },
  userName: {
    type: String,
    required: [true, 'Please add user name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add password'],
    minlength: 6,
    // match: [
    //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    //     "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character:"
    // ]
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
