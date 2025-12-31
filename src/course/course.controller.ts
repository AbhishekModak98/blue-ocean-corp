import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';

import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create-course')
  async createCourse(@Body() createDto: CreateCourseDto) {
    return await this.courseService.createCourse(createDto);
  }

  @Get('course-list')
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('title') title: string
  ) {
    return await this.courseService.findAll(page, limit, title)
  }

  @Get('one-course/:id')
  async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(id);
  }

  @Put('update-course/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateDto: UpdateCourseDto
  ) {
    return await this.courseService.updateOne(id, updateDto);
  }

  @Delete('delete-course/:id')
  async deleteOne(@Param('id') id: string) {
    return await this.courseService.softDelete(id);
  }
}
