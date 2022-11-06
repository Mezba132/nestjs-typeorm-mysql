import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './users.dto';
let bcrypt = require('bcryptjs');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  registerNewUser = async (body: UserDto) => {
    try {
      let salt = bcrypt.genSaltSync(10);
      body.password = bcrypt.hashSync(body.password, salt);
      let saved: any = await this.userRepository
        .createQueryBuilder()
        .insert()
        .values(body)
        .into(User)
        .execute();
      let user = await this.userRepository
        .createQueryBuilder('user')
        .where('id = :id', { id: saved.raw.insertId })
        .select([
          'user.id',
          'user.fullName',
          'user.email',
          'user.phone',
          'user.age',
        ])
        .getOne();
      return {
        success: true,
        message: 'Success',
        data: user,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  };

  getAllUsers = async () => {
    let users: any = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.fullName', 'user.age'])
      .getMany();
    return {
      success: true,
      message: 'Successfully Fetched',
      data: users,
    };
  };
}
