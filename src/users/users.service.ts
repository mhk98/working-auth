import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from './usertbl.entity';
// import { usertbl } from './usertbl.entity';

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
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  findOne(User_Email: string): Promise<Users> {
    return this.usersRepository.findOneBy({ User_Email: User_Email });
  }

  async SignUP(body: any) {
    let existence = await this.usersRepository.findOneBy({
      User_Email: body.User_Email,
    });
    console.log(existence);
    if (existence) {
      throw new UnauthorizedException('Credentials incorrect');
    } else {
      console.log('Congratulations for signup');
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(body.pass_word, saltOrRounds);
    console.log(body, 'sign up data here');
    let UserEntity = await this.usersRepository.create({
      // User_FirstName:
      User_Email: body.User_Email,
      pass_word: hash,
    });
    return this.usersRepository.save(UserEntity);
  }
}
