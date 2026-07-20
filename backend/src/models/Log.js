import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  adminId: { type: String }, 
  action: { type: String, required: true },
  targetId: { type: String },
  details: { type: Object }
}, { timestamps: true });

const Log = mongoose.models.Log || mongoose.model('Log', logSchema);
export default Log;