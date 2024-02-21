import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodsService } from './foods.service';

@Controller('food')
export class FoodsController {
  /**
   * Creates an instance of the FoodsController class.
   * @param foodService The food service instance.
   */
    constructor(private readonly foodService: FoodsService) {}

    @Get()
    async getFoodAsync(@Query('type') type: string) {
        try {
            return await this.foodService.findFoodsDB(type);
        } catch (error) {
            throw new HttpException('Not found', 404);
        }
    }

    @Get(':id')
    async getFoodDetails(@Param('id') id: string) {
        try {
            return await this.foodService.findOneByIdDB(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Post()
    async addFoodAsync(@Body(new ValidationPipe()) createFoodDto: CreateFoodDto) {    
        try {
            return await this.foodService.createFoodDB(createFoodDto);
        } catch (error) { // Updated the catch clause variable type annotation to 'any'
            throw new NotFoundException();
        }    
    }

    @Put(':id')
    async updateFood(@Param('id') id: string, @Body(new ValidationPipe()) updateFoodDto: UpdateFoodDto) {
        try {
            return await this.foodService.updateFoodDB(id, updateFoodDto);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async deleteFood(@Param('id') id: string) {
        try {
            return await this.foodService.deleteFoodDB(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

}
