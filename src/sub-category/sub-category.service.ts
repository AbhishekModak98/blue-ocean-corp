import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose from 'mongoose';

import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectModel('subcategory') private readonly SubCategoryModel,
        @InjectModel('category') private readonly CategoryModel,
    ) {};

    async createSubCategory(createDto: CreateSubCategoryDto) {
        try {
            const categoryExists = await this.CategoryModel.findOne({
                _id: new mongoose.Types.ObjectId(createDto?.categoryId),
                isDeleted: false
            }).lean();

            if (!categoryExists) return { statusCode: 400, message: 'Invalid Category!' };

            const createResult = await this.SubCategoryModel.create(createDto);

            return { statusCode: 200, message: 'Sub category created!', data: createResult };
        } catch (error) {
            return { statusCode: 500, message: error?.message || 'Internal server error' };
        }
    }

    async findAll(page: string = "1", limit: string = "10", name: string, categoryId: string) {
        try {
            let condition = { isDeleted: false };
            if (name) condition['name'] = { $regex: name, $options: 'i' };
            if (categoryId) condition['categoryId'] = categoryId;

            const skip = (Number(page) - 1) * Number(limit);

            const [results, count] = await Promise.all([
                this.SubCategoryModel
                    .find(condition)
                    .populate('categoryId', 'name')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(Number(limit))
                    .lean(),
                this.SubCategoryModel.countDocuments(condition)
            ]);

            return {
                statusCode: 200,
                message: 'Sub categories fetched!',
                data: {
                    total: count,
                    page: Number(page),
                    limit: Number(limit),
                    data: results
                }
            };
        } catch (error) {
            return { statusCode: 500, message: error?.message || 'Internal server error' };
        }
    }

    async findOne(id: string) {
        try {
            const subCategory = await this.SubCategoryModel
                .findOne({
                    _id: new mongoose.Types.ObjectId(id),
                    isDeleted: false
                })
                .populate('categoryId', 'name')
                .lean();

            if (!subCategory) return { statusCode: 404, message: 'Sub category not found!' };

            return { statusCode: 200, message: 'Sub category found', data: subCategory };
        } catch (error) {
            return { statusCode: 500, message: error?.message || 'Internal server error' };
        }
    }

    async updateOne(id: string, updateDto: UpdateSubCategoryDto) {
        try {
            if (updateDto?.categoryId) {
                const categoryExists = await this.CategoryModel.findOne({
                    _id: new mongoose.Types.ObjectId(updateDto?.categoryId),
                    isDeleted: false
                }).lean();

                if (!categoryExists) return { statusCode: 400, message: 'Invalid Category!' };
            }

            const updateResult = await this.SubCategoryModel.findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(id),
                    isDeleted: false
                },
                updateDto,
                { new: true }
            ).lean();

            if (!updateResult) return { statusCode: 404, message: 'Sub category not found!' };

            return { statusCode: 200, message: 'Sub category updated', data: updateResult };
        } catch (error) {
            return { statusCode: 500, message: error?.message || 'Internal server error' };
        }
    }

    async softDelete(id: string) {
        try {
            const deleteResult = await this.SubCategoryModel.findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(id),
                    isDeleted: false
                },
                { isDeleted: true },
                { new: true }
            ).lean();

            if (!deleteResult) return { statusCode: 404, message: 'Sub category not found!' };

            return { statusCode: 200, message: 'Sub category deleted!' };
        } catch (error) {
            return { statusCode: 500, message: error?.message || 'Internal server error' };
        }
    }
}
