import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/entities/brand.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { Not, Repository } from 'typeorm';


@Injectable()
export class BrandService {
  
  constructor(
    @InjectRepository(Brand)
    private repository: Repository<Brand>
  ) {}


  getAllBrands() {
    return this.repository.find();
  }

}