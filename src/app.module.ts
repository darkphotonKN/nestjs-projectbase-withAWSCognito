import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './db/db.module'

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
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    ConfigModule.forRoot(),
    // DatabaseModule,
    UsersModule,
    TablesModule,
    FansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
