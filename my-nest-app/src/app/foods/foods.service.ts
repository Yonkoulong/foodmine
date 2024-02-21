import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food, FoodDocument } from './schemas/food.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class FoodsService {
    private food = [
        { id: 0, name: 'Rice', type: 'dessert'},
        { id: 1, name: 'Beans', type: 'main course'},
    ]

    constructor(@InjectModel(Food.name) private readonly model: Model<FoodDocument>) {}

    getFoods(type: string) {
        if(type) {
            return this.food.filter(food => food.type === type);
        }
        return this.food;
    }

    getFoodById(id: number) {
        const food = this.food.find(food => food.id === id);
        if(!food) {
            throw new Error('Food not found');
        }

        return food;
    }

    createFood(createFoodDto: CreateFoodDto) {
        console.log("service: ",createFoodDto);
        const newFood = {
            id: Date.now(),
            ...createFoodDto
        }
        this.food.push(newFood);

        return this.food
    }

    updateFood(id: number, updateFoodDto: UpdateFoodDto) {
        const index = this.food.findIndex(food => food.id === id);
        if(index === -1) {
            throw new Error('Food not found');
        }

        this.food[index] = {
            id: this.food[index].id,
            name: updateFoodDto.name || '',
            type: updateFoodDto.type || ''
        };

        return this.getFoodById(id);
    }

    deleteFood(id: number) {
        const index = this.food.findIndex(food => food.id === id);
        if(index === -1) {
            throw new Error('Food not found');
        }

        this.food.splice(index, 1);

        return 'Food deleted';
    }

    // Use MongoDB
    async findFoodsDB(type: string): Promise<Food[]> {
        if(type) {
            return await this.model.find({
                type: type
            }).exec();
        }

        return await this.model.find().exec();
    }

    async findOneByIdDB(id: string): Promise<Food> {
        console.log("id: ",id);
        const foodDocument = await this.model.findById(id).exec();
        
        if(!foodDocument) {
            throw new NotFoundException(`Food #${id} not found`);
        }

        return foodDocument;
    }

    async createFoodDB(createFoodDto: CreateFoodDto): Promise<Food> {
        return await new this.model({
            ...createFoodDto,
            createdAt: new Date(),
        }).save();
    }

    async updateFoodDB(id: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
        const foodDocument = await this.model.findByIdAndUpdate(id, updateFoodDto).exec();
        
        if(!foodDocument) {
            throw new NotFoundException(`Food #${id} not found`);
        }

        return foodDocument;
    }


    async deleteFoodDB(id: string): Promise<Food> {
        const foodDocument =  await this.model.findByIdAndDelete(id).exec();
        
        if(!foodDocument) {
            throw new NotFoundException(`Food #${id} not found`);
        }

        return foodDocument;
    }
}
