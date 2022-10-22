import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.username === username);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username:username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async SignUP(body: any) {
    let existence = this.usersRepository.findOneBy({ username: body.username });
    console.log(existence, 'existence')
    if(existence){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'You already registered',
      }, HttpStatus.FORBIDDEN);
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(body.password, saltOrRounds);
    console.log(body, 'sign up data here');
    let UserEntity = await this.usersRepository.create({ username: body.username, password: hash });
    return this.usersRepository.save(UserEntity);
  }
}
