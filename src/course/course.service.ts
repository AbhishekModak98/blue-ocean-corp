import mongoose, { startSession } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel('course') private readonly courseModel,
        @InjectModel('category') private readonly categoryModel,
        @InjectModel('subcategory') private readonly subCategoryModel,
    ) { }

    async createCourse(createDto: CreateCourseDto) {
        try {
            const categoryIds = createDto?.categoryIds?.map((id) => {
                return new mongoose.Types.ObjectId(id);
            });

            const categories = await this.categoryModel
                .find({
                    _id: { $in: categoryIds },
                    isDeleted: false,
                })
                .lean();

            if (
                !categories?.length ||
                categories?.length !== createDto?.categoryIds?.length
            ) {
                return { statusCode: 400, message: 'Invalid categories selected' };
            }

            const subCategoryIds = createDto?.subCategoryIds?.map((id) => {
                return new mongoose.Types.ObjectId(id);
            });

            const subCategories = await this.subCategoryModel
                .find({
                    _id: { $in: subCategoryIds },
                    isDeleted: false,
                })
                .lean();

            if (
                !subCategories?.length ||
                subCategories?.length !== createDto?.subCategoryIds?.length
            ) {
                return { statusCode: 400, message: 'Invalid sub categories selected' };
            }

            const categoryIdSet = new Set(createDto?.categoryIds?.map(String));

            for (const subCat of subCategories) {
                if (!categoryIdSet?.has(subCat?.categoryId?.toString())) {
                    return {
                        statusCode: 400,
                        message: 'Sub category does not belong to selected categories',
                    };
                }
            }

            const course = await this.courseModel.create({
                title: createDto?.title,
                description: createDto?.description,
                categoryIds,
                subCategoryIds,
            });

            return { statusCode: 200, message: 'Course created', data: course };
        } catch (error) {
            return {
                statusCode: 500,
                message: error?.message || 'Internal server error',
            };
        }
    }

    async findAll(page: string = '1', limit: string = '10', title: string) {
        try {
            let condition = { isDeleted: false };
            if (title) condition['title'] = { $regex: title, $options: 'i' };

            const skip = (Number(page) - 1) * Number(limit);

            const [results, count] = await Promise.all([
                this.courseModel
                    .find(condition)
                    .populate('categoryIds', 'name')
                    .populate('subCategoryIds', 'name')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(Number(limit))
                    .lean(),
                this.courseModel.countDocuments(condition),
            ]);

            return {
                statusCode: 200,
                message: 'Courses found!',
                data: {
                    total: count,
                    page: Number(page),
                    limit: Number(limit),
                    data: results,
                },
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: error?.message || 'Internal server error',
            };
        }
    }

    async findOne(id: string) {
        try {
            const course = await this.courseModel
                .findOne({
                    _id: new mongoose.Types.ObjectId(id),
                    isDeleted: false,
                })
                .populate('categoryIds', 'name')
                .populate('subCategoryIds', 'name')
                .lean();

            if (!course) return { statusCode: 404, message: 'Course not found' };

            return { statusCode: 200, message: 'Course found!', data: course };
        } catch (error) {
            return {
                statusCode: 500,
                message: error?.message || 'Internal server error',
            };
        }
    }

    async updateOne(id: string, updateDto: UpdateCourseDto) {
        try {
            const updateResult = await this.courseModel
                .findOneAndUpdate(
                    {
                        _id: new mongoose.Types.ObjectId(id),
                        isDeleted: false,
                    },
                    updateDto,
                    { new: true },
                )
                .lean();

            if (!updateResult)
                return { statusCode: 404, message: 'Course not found' };

            return { statusCode: 200, message: 'Course updated', data: updateResult };
        } catch (error) {
            return {
                statusCode: 500,
                message: error?.message || 'Internal server error',
            };
        }
    }

    async softDelete(id: string) {
        try {
            const deleteResult = await this.courseModel
                .findOneAndUpdate(
                    {
                        _id: new mongoose.Types.ObjectId(id),
                        isDeleted: false,
                    },
                    { isDeleted: true },
                    { new: true },
                )
                .lean();

            if (!deleteResult)
                return { statusCode: 404, message: 'Course not found' };

            return { statusCode: 200, message: 'Course deleted' };
        } catch (error) {
            return {
                statusCode: 500,
                message: error?.message || 'Internal server error',
            };
        }
    }
}
