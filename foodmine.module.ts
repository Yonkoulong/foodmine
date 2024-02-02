import { Module } from '@nestjs/common';
import { FoodmineService } from './foodmine.service';
import { FoodmineResolver } from './foodmine.resolver';

@Module({
  providers: [FoodmineResolver, FoodmineService],
})
export class FoodmineModule {}
