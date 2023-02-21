import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // this tells the DI system that we need the repository - it automatically creates an instance of this entity
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // find one user
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.userRepository.findOneBy({ id }); // returns one or null
  }

  // find all users that match criteria
  find(email: string) {
    return this.userRepository.find({ where: { email } }); // returns array of all results
  }

  // update a user
  async update(id: number, updateUser: Partial<User>) {
    // find the targetted user to update
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User wasn't found");
    }

    const newUser = { ...user, ...updateUser }; // can also use Object.assign(user, updateUser)
    return this.userRepository.save(newUser);
  }

  // remove a user
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.remove(user);
  }
}
