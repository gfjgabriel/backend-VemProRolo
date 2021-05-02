import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/entities/dtos/user/auth.dto';
import { UserCreateDto } from 'src/entities/dtos/user/create-user.dto';
import { ErrorConstants } from 'src/utils/error-constants.enum';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(userCreateDto: UserCreateDto): Promise<User> {
    console.log(userCreateDto);
    userCreateDto.password = bcrypt.hashSync(userCreateDto.password, parseInt(process.env.SALT_ROUNDS, 10));
    return this.userRepository.save(userCreateDto);
  }

  findOneByEmailAndPassword(authDto: AuthDto): Promise<User> {
    console.log(authDto);
    const email = authDto.email;
    var user = this.userRepository.findOne({ email }).then(
      it => {
        if (it === undefined) {
          throw new HttpException(ErrorConstants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        if (bcrypt.compareSync(authDto.password, it.password)) {
          return it;
        } else {
          throw new HttpException(ErrorConstants.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
      }
    );
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}