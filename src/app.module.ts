import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

// DB connection
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

import { Table } from './tables/table.entity';
import { TablesModule } from './tables/tables.module';

import { Fan } from './fans/fan.entity';
import { FansModule } from './fans/fans.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // type of database
      database: 'db.sqlite', // name of database
      entities: [User, Table, Fan],
      /**
       * Extremely important setting *
       * This is only for DEVELOPMENT environment
       *
       * This automatically create and remove tables, add / remove columns
       * by TypeORM via looking at our ENTITIES.
       *
       * This means if we change our entities our tables and columns will change
       * dynamically to match our entities
       */
      synchronize: true,
    }),

    UsersModule,
    TablesModule,
    FansModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
