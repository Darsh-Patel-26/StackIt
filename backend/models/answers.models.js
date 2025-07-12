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
    ref: 'Userr'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userr'
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
    ref: 'Userr',
    required: true
  }
},{
  timestamps:true
});

// Update votes count
answerSchema.methods.updateVotes = function() {
  this.votes = this.upvotes.length - this.downvotes.length;
  return this.save();
};

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;