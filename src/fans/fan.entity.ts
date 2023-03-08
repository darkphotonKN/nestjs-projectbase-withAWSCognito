import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  CreateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';

// all the properties that a user would have, and that we would want to store in the database
@Entity() // tells TypeORM to make sure it creates a TABLE called User
export class Fan {
  @PrimaryGeneratedColumn() // look at the table of users and add the column "id"
  id: string;

  @Column()
  type: string;

  @Column()
  info: string; 

  @Column()
  modelNo: string;

  @Column()
  seriesNo: string;

  @Column()
  name: string;

  @CreateDateColumn()
  updateDate: Date; // Creation date
  
  @CreateDateColumn()
  systemDate: Date; // Creation date

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
