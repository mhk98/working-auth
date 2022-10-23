import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(Mobile_No: string, pass: string): Promise<any> {
    console.log('I got the user');
    const user = await this.usersService.findOne(Mobile_No);
    if (user && user.pass_word === pass) {
      const { pass_word, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { Mobile_No: user.Mobile_No, sub: user.User_ID };
    console.log(user.Mobile_No);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async SignUp(body): Promise<any> {
    // return 'you got me';
    this.usersService.SignUP(body);
  }
}
