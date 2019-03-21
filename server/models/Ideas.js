import mongoose from 'mongoose';

const IdeaSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  impact: {
    type: Number,
    required: true
  },
  ease: {
    type: Number,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

IdeaSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

export default mongoose.model('Idea', IdeaSchema); 