import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repo: Repository<User>,
    ) {}

    findByID(id: number): Promise<Omit<User, 'password'>> {
        return this.repo.findOne(id);
    }

    findByUsername(username: string): Promise<User> {
        return this.repo.findOne({username: username});
    }

    async create(dto: Omit<User, 'id'>): Promise<Omit<User, 'password'>> {
        if(this.repo.findOne({username: dto.username})){
            throw new BadRequestException('username existed');
        }
        const password = await hash(dto.password, 10);
        const user = {... new User(), ... dto, password};
        return this.repo.save(user);
    }

    async update(id: number, dto: Partial<Omit<User, 'id'>>): Promise<Omit<User, 'password'>> {
        const user = {... (await this.findByID(id)), ... dto};
        if(!user){
            throw new BadRequestException('ID not existed');
        }
        if(dto.password){
            user.password = await hash(dto.password, 10);
        }
        return this.repo.save(user);
    }
}
