import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/auth/auth.dto';
import { Auth } from 'src/entity/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
let bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Auth) private authRepository : Repository<Auth>,
        private jwtService: JwtService
    ) {}


    async validateUser(email: string, password: string): Promise<any> {
        
        const user = await this.authRepository.findOneOrFail({ where : { email : email } });
        if (user) {
            let passwordCheck = bcrypt.compareSync(password, user.password)
            if(passwordCheck) {
                return user;
            }
            else {
                throw new UnauthorizedException()
            }
        }
        else {
            throw new UnauthorizedException()
        }
    }

    async createAdmin(body : AuthDto){

        let salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(body.password, salt);

        const person = this.authRepository.create(body);
        return await this.authRepository.save(person);

    }

    async login(user : any) {
        let data = { name : user.name, email : user.email }
        return {
            status : 200,
            message : 'success',
            data : {
                accessToken : this.jwtService.sign(data),
                refreshToken : bcrypt.genSaltSync(5),
                result : data
            }
        }
    }

    verifyJwt(jwt: string) {
        try {
            return this.jwtService.verify(jwt);
        } catch (error) {
            throw new UnauthorizedException('JWT verification failed');
        }
    }
}
