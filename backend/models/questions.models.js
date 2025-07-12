import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 200
  },
  desc: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  imageurl: {
    type: String,
    default: ''
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  votes: {
    type: Number,
    default: 0
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
},{
  timestamps:true
});

questionSchema.methods.updateVotes = function() {
  this.votes = this.upvotes.length - this.downvotes.length;
  return this.save();
};

const Question = mongoose.model('Question', questionSchema);

export default Question;