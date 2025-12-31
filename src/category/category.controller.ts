import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  async createCategory(@Body() creteDto: CreateCategoryDto) {
    return await this.categoryService.createCategory(creteDto);
  }

  @Get('category-list')
  async findAll(
    @Query() page: string,
    @Query() limit: string,
    @Query() name: string
  ) {
    return await this.categoryService.findAll(page, limit, name);
  }

  @Get('single-record/:id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @Put('update-one/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateDto: UpdateCategoryDto
  ) {
    return await this.categoryService.update(id, updateDto);
  }

  @Delete('delete-one/:id')
  async softDelete(@Param('id') id: string) {
    return await this.categoryService.softDelete(id);
  }

  @Get('sub-category-count')
  async subCategoryCount() {
    return await this.categoryService.categorySubcategoryCount();
  }
}
