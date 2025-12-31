import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateCourseDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    categoryIds?: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    subCategoryIds?: string[];
}
