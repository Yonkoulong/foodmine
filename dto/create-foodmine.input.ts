import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFoodmineInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
