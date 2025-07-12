import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userr',
    required: true
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  },
  reply: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
},{
  timestamps:true
});

const Reply = mongoose.model('Reply', replySchema);
export default Reply;