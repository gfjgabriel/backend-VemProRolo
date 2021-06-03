import { Injectable } from "@nestjs/common";
import { ImageService } from "src/services/image.service";

@Injectable()
export class ImageFacade {
    constructor(private readonly imageService: ImageService) {}

}