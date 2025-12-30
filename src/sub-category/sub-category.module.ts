import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategorySchema } from 'src/category/category.model';

import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { subCategorySchema } from './sub-category.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'subcategory', schema: subCategorySchema },
      { name: 'category', schema: CategorySchema },
    ]),
  ],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
