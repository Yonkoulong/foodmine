import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FoodmineService } from './foodmine.service';
import { Foodmine } from './entities/foodmine.entity';
import { CreateFoodmineInput } from './dto/create-foodmine.input';
import { UpdateFoodmineInput } from './dto/update-foodmine.input';

@Resolver(() => Foodmine)
export class FoodmineResolver {
  constructor(private readonly foodmineService: FoodmineService) {}

  @Mutation(() => Foodmine)
  createFoodmine(
    @Args('createFoodmineInput') createFoodmineInput: CreateFoodmineInput
  ) {
    return this.foodmineService.create(createFoodmineInput);
  }

  @Query(() => [Foodmine], { name: 'foodmine' })
  findAll() {
    return this.foodmineService.findAll();
  }

  @Query(() => Foodmine, { name: 'foodmine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.foodmineService.findOne(id);
  }

  @Mutation(() => Foodmine)
  updateFoodmine(
    @Args('updateFoodmineInput') updateFoodmineInput: UpdateFoodmineInput
  ) {
    return this.foodmineService.update(
      updateFoodmineInput.id,
      updateFoodmineInput
    );
  }

  @Mutation(() => Foodmine)
  removeFoodmine(@Args('id', { type: () => Int }) id: number) {
    return this.foodmineService.remove(id);
  }
}
