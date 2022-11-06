import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
let bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // const user = await this.authRepository.findOne({ where: { email } });
    // if (user) {
    //   let passwordCheck = bcrypt.compareSync(password, user.password);
    //   if (passwordCheck) {
    //     return user;
    //   } else {
    //     throw new UnauthorizedException();
    //   }
    // } else {
    //   throw new UnauthorizedException();
    // }
  }

  async login(user: any) {
    let data = { name: user.name, email: user.email };
    return {
      status: 200,
      message: 'success',
      data: {
        accessToken: this.jwtService.sign(data),
        refreshToken: bcrypt.genSaltSync(5),
        result: data,
      },
    };
  }

  verifyJwt(jwt: string) {
    try {
      return this.jwtService.verify(jwt);
    } catch (error) {
      throw new UnauthorizedException('JWT verification failed');
    }
  }
}
