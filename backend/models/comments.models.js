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
  timestamp: {
    type: Date,
    default: Date.now
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
});

// Update votes count
commentSchema.methods.updateVotes = function() {
  this.votes = this.upvotes.length - this.downvotes.length;
  return this.save();
};

module.exports = mongoose.model('Comment', commentSchema);