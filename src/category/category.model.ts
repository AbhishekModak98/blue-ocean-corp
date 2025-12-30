import mongoose from 'mongoose';

export const Category = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });