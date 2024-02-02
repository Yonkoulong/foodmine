import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodCategoryController } from './food-category.controller';

@Module({
  imports: [],
  controllers: [AppController, FoodCategoryController],
  providers: [AppService],
})
export class AppModule {}
