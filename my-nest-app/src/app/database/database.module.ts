import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import database from './constants/db';


@Module({
  imports: [
    MongooseModule.forRootAsync({
        imports: [],
        useFactory: () => ({
            uri: database.DATABASE_URL,
            dbName: database.DATABASE_NAME,
        }),
        inject: [],

    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
