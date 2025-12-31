import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategorySchema } from 'src/category/category.model';
import { subCategorySchema } from 'src/sub-category/sub-category.model';

import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseSchema } from './course.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'course', schema: CourseSchema },
      { name: 'category', schema: CategorySchema },
      { name: 'subcategory', schema: subCategorySchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
