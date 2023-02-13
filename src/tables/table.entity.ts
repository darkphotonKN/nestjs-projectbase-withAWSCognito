import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

import { Exclude } from 'class-transformer';

// all the properties that a user would have, and that we would want to store in the database
@Entity() // tells TypeORM to make sure it creates a TABLE called User
export class Table {
  @PrimaryGeneratedColumn() // look at the table of users and add the column "id"
  id: string;

  // @PrimaryGeneratedColumn() // look at the table of users and add the column "id"
  // date: Date;

  @Column() // same here, column "name" that can hold strings (VARCHAR in sql)
  version: string;

  @Column()
  type: string;

  @Column()
  info: string; 

  @Column()
  modelNo: string;

  @Column()
  seriesNo: string;

  // typeORM Hooks for handling debugging / testing
  // this only works if you create an entity instance before saving to DB
  @AfterInsert()
  logInsert() {
    console.log('New user created with id:', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('New user removed with id:', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('New user updated with id:', this.id);
  }
}
