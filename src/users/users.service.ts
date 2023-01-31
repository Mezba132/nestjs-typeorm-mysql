import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './users.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  registerNewUser = async (body: UserDto) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      body.password = bcrypt.hashSync(body.password, salt);
      const data: any = await this.userRepository
        .createQueryBuilder()
        .insert()
        .values(body)
        .into(User)
        .execute();
      return {
        success: true,
        message: 'Success',
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  };

  getAllUsers = async () => {
    const users: any = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.email'])
      .getMany();
    return {
      success: true,
      message: 'Successfully Fetched',
      data: users,
    };
  };
}
