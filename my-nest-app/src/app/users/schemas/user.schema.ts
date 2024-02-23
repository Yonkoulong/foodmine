import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    username!: string;

    @Prop()
    fullname?: string;

    @Prop()
    email?: string;

    @Prop()
    password!: string;

    @Prop()
    phoneNumber?: string;

    @Prop()
    address?: string;

    @Prop()
    role!: string;

    @Prop()
    imageUser?: string;

    @Prop()
    timestamp!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);