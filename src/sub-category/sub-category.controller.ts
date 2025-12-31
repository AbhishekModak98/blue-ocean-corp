import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';

import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post('create-sub-category')
  async createSubCategory(@Body() createDto: CreateSubCategoryDto) {
    return await this.subCategoryService.createSubCategory(createDto);
  }

  @Get('sub-category-list')
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('name') name: string,
    @Query('categoryId') categoryId: string
  ) {
    return await this.subCategoryService.findAll(page, limit, name, categoryId);
  }

  @Get('single-record/:id')
  async findOne(@Param('id') id: string) {
    return await this.subCategoryService.findOne(id);
  }

  @Put('update-sub-category/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateDto: UpdateSubCategoryDto
  ) {
    return await this.subCategoryService.updateOne(id, updateDto);
  }

  @Delete('delete-sub-category/:id')
  async softDelete(@Param('id') id: string) {
    return await this.subCategoryService.softDelete(id);
  }
}
