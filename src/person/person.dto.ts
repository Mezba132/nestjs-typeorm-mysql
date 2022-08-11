import { IsNotEmpty, IsString } from "class-validator";

export class PersonDto {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    email : string

    @IsNotEmpty()
    @IsString()
    address : string
}