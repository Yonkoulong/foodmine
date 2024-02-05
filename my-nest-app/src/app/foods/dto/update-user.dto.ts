import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodDto } from './create-user.dto';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {}
