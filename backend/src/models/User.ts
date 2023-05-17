import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserInterface extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  isPasswordValid(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserInterface>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre<UserInterface>("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err: any) {
    next(err);
  }
});

userSchema.methods.isPasswordValid = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("user", userSchema);

export default User;
