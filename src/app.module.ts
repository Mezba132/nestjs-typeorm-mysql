import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config  from '../ormConfig';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { CheckTokenMiddleware } from './middleware/checkToken.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config), 
    PersonModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
          .apply(CheckTokenMiddleware)
          .exclude(
            { path : 'auth/login', method : RequestMethod.POST},
            { path : 'auth/register', method : RequestMethod.POST }
          )
          .forRoutes('*');
  }
}

