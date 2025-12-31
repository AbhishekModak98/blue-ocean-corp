import mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    categoryIds: { type: [mongoose.Types.ObjectId], ref: 'category' },
    subCategoryIds: { type: [mongoose.Types.ObjectId], ref: 'subcategory' },
    isDeleted: { type: Boolean }
}, { timestamps: true });
