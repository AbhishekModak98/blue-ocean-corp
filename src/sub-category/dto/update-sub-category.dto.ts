import { IsOptional, IsString } from "class-validator";

export class UpdateSubCategoryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    categoryId?: string
}
