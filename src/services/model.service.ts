import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'src/entities/model.entity';
import { Not, Repository } from 'typeorm';


@Injectable()
export class ModelService {
  
  constructor(
    @InjectRepository(Model)
    private repository: Repository<Model>
  ) {}


  getAllModels() {
    return this.repository.find(
        {
            relations:["brand"]
        }
    );
  }

}