import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get(':id')
    findByID(@Param('id', new ParseIntPipe()) id: number): Promise<Omit<User, 'password'>>{
        return this.userService.findByID(id);
    }

    @Post()
    create(@Body() dto: Omit<User, 'id'>): Promise<Omit<User, 'password'>>{
        return this.userService.create(dto);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() dto: Partial<Omit<User, 'id'>>,
    ): Promise<Omit<User, 'password'>>{
        return this.userService.update(id, dto);
    }
}
