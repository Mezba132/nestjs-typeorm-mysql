import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/entity/auth.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports : [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      secret: 'HelloApsis2022',
      signOptions: { expiresIn: '10000s' }
    })
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
