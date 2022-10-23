import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { usertbl } from './usertbl.entity';

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
    @InjectRepository(usertbl)
    private usersRepository: Repository<usertbl>,
  ) {}

  findAll(): Promise<usertbl[]> {
    return this.usersRepository.find();
  }

  findOne(Mobile_No: string): Promise<usertbl> {
    return this.usersRepository.findOneBy({ Mobile_No: Mobile_No });
  }

  async SignUP(body: any) {
    let existence = await this.usersRepository.findOneBy({
      Mobile_No: body.Mobile_No,
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
      User_FirstName: body.User_FirstName,
      User_LastName: body.User_LastName,
      User_Email: body.User_Email,
      pass_word: hash,
      Mobile_No: body.Mobile_No,
      User_role: body.User_role,
    });
    console.log(body);
    return this.usersRepository.save(UserEntity);
  }
}
