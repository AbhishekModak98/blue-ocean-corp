import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import mongoose from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('category') private readonly categoryModel,
    ) {}

    async createCategory(createDto: CreateCategoryDto) {
        try {
            const createResult = await this.categoryModel.create(createDto);
            return { statusCode: 200, message: 'Category created!', data: createResult };
        } catch (error) {
            return { statusCode: 500, message: error?.message || 'Internal server error' };
        }
    }

    async findAll(page: string = "1", limit: string = "10", name: string ) {
        try {
            let condition = { isDeleted: false };
            if (name) condition['name'] = { $regex: name, $options: 'i' };

            const skip = (Number(page) - 1) * Number(limit);

            const [results, count] = await Promise.all([
                this.categoryModel
                    .find(condition)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(Number(limit)),
                this.categoryModel.countDocuments(condition)
            ]);

            return {
                statusCode: 200,
                message: 'Categories fetched!',
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
            const category = await this.categoryModel.findOne({
                _id: new mongoose.Types.ObjectId(id),
                isDeleted: false
            }).lean();

            if (!category) return { statusCode: 404, message: 'Category not found!' };

            return { statusCode: 200, message: 'Category found!', data: category };
        } catch (error) {
            return { statusCode: 500, message: error?.message || 'Internal server error' };
        }
    }

    async update(id: string, updateDto: UpdateCategoryDto) {
        try {
            const updateResult = await this.categoryModel.findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(id),
                    isDeleted: false
                },
                updateDto,
                { new: true }
            ).lean();

            if (!updateResult) return { statusCode: 404, message: 'Category not found!' };

            return { statusCode: 200, message: 'Category updated!', data: updateResult };
        } catch (error) {
            return { statusCode: 500, message: error?.message || 'Internal server error' };
        }
    }

    async softDelete(id: string) {
        try {
            const deletedCategory = await this.categoryModel.findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(id),
                    isDeleted: false
                },
                { isDeleted: true },
                { new: true },
            ).lean();

            if (!deletedCategory) return { statusCode: 404, message: 'Category not found!' };

            return { statusCode: 200, message: 'Category deleted!' };
        } catch (error) {
            return { statusCode: 500, message: error?.message || 'Internal server error' };
        }
    }
}
