import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() dto: {'username': string, 'password': string}){
        return this.authService.login(dto);
    }
}
