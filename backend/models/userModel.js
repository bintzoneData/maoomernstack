import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please  add valid  name'],
    },
    email: {
      type: String,
      required: [true, 'Please  add valid  email'],
    },
    password: {
      type: String,
      required: [true, 'Please  add valid  password'],
    },
  },
  {
    timeStamps: true,
  }
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
