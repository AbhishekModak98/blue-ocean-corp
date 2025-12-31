import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://abhishekrameshwarmodak_db_user:7TJzDP5fhYMM0j7V@assignment.pxb7cru.mongodb.net/?appName=Assignment`,
      {
        connectionFactory: (connection) => {
          console.log('Connected to database');
          return connection;
        }
      },
    ),
    CategoryModule,
    SubCategoryModule,
    CourseModule
  ]
})
export class AppModule {}
