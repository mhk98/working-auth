import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { usertbl } from './usertbl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([usertbl])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
