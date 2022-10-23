import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  User_ID: string;
  @IsString()
  User_FirstName: string;
  @IsString()
  User_LastName: string;
  @IsString()
  User_Email: string;
  @IsString()
  pass_word: string;
  @IsString()
  Mobile_No: string;
  @IsString()
  User_role: string;
}
