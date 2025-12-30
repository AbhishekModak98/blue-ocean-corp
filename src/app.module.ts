import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [CategoryModule, SubCategoryModule, CourseModule]
})
export class AppModule {}
