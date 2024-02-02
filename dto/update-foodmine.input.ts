import { CreateFoodmineInput } from './create-foodmine.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFoodmineInput extends PartialType(CreateFoodmineInput) {
  @Field(() => Int)
  id: number;
}
