import mongoose from 'mongoose';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Define the User schema
const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[\w-]+@[a-zA-Z\d]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  bio: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  },
  socialMedia: {
    website: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    github: {
      type: String,
      trim: true
    }
  },
  role: {
    type: String,
    enum: ['user', 'instructor', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
}, {
  timestamps: true,
});

// Create the User model using the schema
const User = mongoose.models.User<IUser> || mongoose.model<IUser>('User', userSchema);

export default User;