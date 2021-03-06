import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  
  constructor(
    @InjectRepository(Image)
    private repository: Repository<Image>
  ) {}

  async deleteImage(id: number) {
    console.log("VAI DELETAR")
    return await this.repository.delete(id);
  }

}