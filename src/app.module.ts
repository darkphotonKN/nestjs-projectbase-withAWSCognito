import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      // apply config to entire application
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // old
    // TypeOrmModule.forRoot({
    //   type: 'sqlite', // type of database
    //   database: 'db.sqlite', // name of database
    //   entities: [User, Table, Fan],
    //   /**
    //    * Extremely important setting *
    //    * This is only for DEVELOPMENT environment
    //    *
    //    * This automatically create and remove tables, add / remove columns
    //    * by TypeORM via looking at our ENTITIES.
    //    *
    //    * This means if we change our entities our tables and columns will change
    //    * dynamically to match our entities
    //    */
    //   synchronize: true,
    // }),
    // new
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      // dependency injection happens here
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User],
        };
      },
    }),
    UsersModule,
    TablesModule,
    FansModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
