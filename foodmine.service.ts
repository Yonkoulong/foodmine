import { Injectable } from '@nestjs/common';
import { CreateFoodmineInput } from './dto/create-foodmine.input';
import { UpdateFoodmineInput } from './dto/update-foodmine.input';

@Injectable()
export class FoodmineService {
  create(createFoodmineInput: CreateFoodmineInput) {
    return 'This action adds a new foodmine';
  }

  findAll() {
    return `This action returns all foodmine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodmine`;
  }

  update(id: number, updateFoodmineInput: UpdateFoodmineInput) {
    return `This action updates a #${id} foodmine`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodmine`;
  }
}
