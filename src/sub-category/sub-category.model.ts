import mongoose from "mongoose";

export const subCategorySchema = new mongoose.Schema({
    name: { type: String },
    categoryId: { type: mongoose.Types.ObjectId, ref: 'category' },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
