const mongoose = require('mongoose');

const SharesSchema =  new mongoose.Schema({ 
  userId: {
    type: String,
    optional: true
  },
  sharedAt: {
    type: Date,
    optional: true
  }
}) 

const PostSchema = new mongoose.Schema({
  type:{
    type: String,
  },
  description: {
    type: String,
  },
  // files: {
  //   type: Array,
  //   required : false
  // },
  posterId: {
    type: String,
    required: [true, 'Please add poster'],
  },
  postedAt: {
      type: Date,
      default: new Date()
  },
  commentIds: {
    type: Array,
    required: false
  },
  numberOfLikes: {
    type: Number,
    required: false
  },
  shares:{
    type: [SharesSchema],
    optional: true
  }
}, { timestamps: true });


module.exports = mongoose.model('Post', PostSchema);;
