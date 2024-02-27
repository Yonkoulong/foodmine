import { IsEnum, MinLength } from 'class-validator';

export class CreateFoodDto {
  @MinLength(3)
  name = '';

  @IsEnum(
    [
      'drink',
      'main course',
      'dessert',
      'appetizer',
      'side dish',
      'salad',
      'bread',
      'breakfast',
      'soup',
      'beverage',
      'sauce',
      'marinade',
      'fingerfood',
      'snack',
      'other',
    ],
    { message: 'Invalid type' }
  )
  type = '';
}
