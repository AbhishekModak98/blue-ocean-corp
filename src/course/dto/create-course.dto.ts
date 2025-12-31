import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description?: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    categoryIds: string[];

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    subCategoryIds: string[];
}
