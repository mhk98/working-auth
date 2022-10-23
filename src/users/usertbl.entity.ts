import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  User_ID: string;
  @Column()
  User_FirstName: string;
  @Column()
  User_LastName: string;
  @Column()
  User_Email: string;
  @Column()
  pass_word: string;
  @Column()
  Mobile_No: string;
  @Column()
  User_role: string;
}
