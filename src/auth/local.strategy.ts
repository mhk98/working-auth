import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(User_Email: string, pass_word: string): Promise<any> {
    const user = await this.authService.validateUser(User_Email, pass_word);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
