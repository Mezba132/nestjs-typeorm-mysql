import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserDto } from './users.dto';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  let userDto = new UserDto();
  (userDto.age = 30),
    (userDto.email = 'test@mail.com'),
    (userDto.fullName = 'leo messi'),
    (userDto.password = 'm4567'),
    (userDto.phone = '01752918411');

  let usersService = jest.fn((user) => {
    return {
      ...userDto,
    };
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // controllers: [UsersController],
      providers: [
        UsersController,
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a create method', () => {
    expect(controller.registerNewUser).toBeDefined();
  });

  it('should match with userDto and return id', () => {
    console.log(userDto);
    expect(controller.registerNewUser(userDto)).toEqual({
      ...userDto,
    });
  });
});
