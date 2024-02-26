import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Food, FoodSchema } from './schemas/food.schema';
import { AuthInterceptor } from '../interceptor/auth/auth.interceptor';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [FoodsController],
  providers: [FoodsService, AuthInterceptor],
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  exports: [],
})
export class FoodsModule {}
