import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/auth/auth.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('register')
    createAdmin(@Body() body : AuthDto) {
        return this.authService.createAdmin(body);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user)
    }
    
}
