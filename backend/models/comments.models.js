import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  que: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  comment: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  votes: {
    type: Number,
    default: 0
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  }]
},{
  timestamps:true
});

commentSchema.methods.updateVotes = function() {
  this.votes = this.upvotes.length - this.downvotes.length;
  return this.save();
};

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;