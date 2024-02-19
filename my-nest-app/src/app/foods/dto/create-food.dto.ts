import { IsEnum, MinLength } from 'class-validator';

export class CreateFoodDto {
    @MinLength(3)
    name = '';

    @IsEnum(['main course', 'dessert', 'appetizer', 'beverage'], { message: 'Invalid type'  })
    type = '';
}
