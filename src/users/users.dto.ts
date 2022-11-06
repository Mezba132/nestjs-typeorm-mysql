import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('BD')
  @Matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, {
    message: 'phone number is not valid',
  })
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, {
    message:
      'Password length must be 5 and at least need one character and one number',
  })
  password: string;
}
