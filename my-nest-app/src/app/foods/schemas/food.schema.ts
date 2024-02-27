import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema({ timestamps: true }) // Enable timestamps
export class Food {
    @Prop()
    name!: string;

    @Prop() 
    price!: number;

    @Prop()
    type!: string;

    @Prop()
    cookingTime!: number;

    @Prop()
    imageFood!: string;

    @Prop()
    timestamps!: boolean;
}

export const FoodSchema = SchemaFactory.createForClass(Food);