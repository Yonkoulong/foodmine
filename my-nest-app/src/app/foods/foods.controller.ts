import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { create } from 'domain';
import { CreateFoodDto } from './dto/create-user.dto';

@Controller('food')
export class FoodsController {

    @Get()
    getFoods(@Query('type') type: string){
        if(type) {
            return {
                message: `Getting foods of type ${type}`
            }
        } 
        return {
            message: "Getting all foods"
        };
    }

    @Get(':id')
    getFoodDetails() {
        return "Food details";
    }

    @Post()
    addFood(@Body() createFoodDto: CreateFoodDto){
        return {
            name: createFoodDto.name,
        };
    }

    @Put(':id')
    updateFood(@Param('id') id: string) {
        return {
            id: id,
            message: "Update food"
        };
    }

    @Delete(':id') 
    deleteFood(@Param('id') id: string) {
        return "Delete food";
    }
}
