const mongoose = require('mongoose');
const Counter = require('./Counter');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  customID: Number
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const doc = this;

  // Only assign if this is a new document
  if (doc.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'users' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    doc.customID = counter.seq; // assign sequential number
  }

  next();
});




module.exports =  mongoose.model('User', UserSchema);
