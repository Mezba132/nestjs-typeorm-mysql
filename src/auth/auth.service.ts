import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findOne({ where: { email } });
    if (user) {
      const passwordCheck = bcrypt.compareSync(password, user.password);
      if (passwordCheck) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new BadRequestException('User Not Found');
      }
    } else {
      throw new BadRequestException('User Not Found');
    }
  }

  async login(user: any) {
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      dob: user.dob,
    };
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
