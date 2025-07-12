import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  que: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  answerData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
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
  isAccepted: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update votes count
answerSchema.methods.updateVotes = function() {
  this.votes = this.upvotes.length - this.downvotes.length;
  return this.save();
};

module.exports = mongoose.model('Answer', answerSchema);