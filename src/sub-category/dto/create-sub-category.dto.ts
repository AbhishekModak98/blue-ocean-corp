import { IsNotEmpty, IsString } from "class-validator";

export class CreateSubCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    categoryId: string;
}
