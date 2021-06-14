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

  async findAllByVehicleId(vehicleId: string) {
    return (await this.repository.find({
      where: {
        vehicle: {
          id: vehicleId
        }
      },
      relations: ['vehicle']}));
  }

}