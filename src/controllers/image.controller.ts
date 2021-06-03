import { Controller, UseGuards } from '@nestjs/common';
import { AuthorizerGuard } from '../auth/guards/cognito.guard';
import { ImageFacade } from 'src/facade/image.facade';

@Controller('images')
@UseGuards(AuthorizerGuard)
export class ImageController {
  constructor(private readonly facade: ImageFacade) {}

}
