import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { isNotEmpty } from 'class-validator';
import { AuthDto } from 'src/dtos/user/auth.dto';
import { UserCreateDto } from 'src/dtos/user/create-user.dto';
import { UserDto } from 'src/dtos/user/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(userCreateDto: UserCreateDto): Promise<User> {
    return this.userRepository.save(userCreateDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneByEmailAndPassword(authDto: AuthDto): Promise<User> {
    const email = authDto.email;
    const password = authDto.password;
    return this.userRepository.findOne({ email, password });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}