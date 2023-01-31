import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/entities';
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('DB_HOST_DEV'),
      port: 3306,
      username: configService.get('DB_USER_DEV'),
      password: '',
      database: configService.get('DB_NAME_DEV'),
      entities,
      synchronize: true,
    }),
  }),
];
