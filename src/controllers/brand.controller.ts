import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BrandFacade } from 'src/facade/brand.facade';

@Controller('brands')
export class BrandController {
  constructor(private readonly facade: BrandFacade) {}

  @Get('allBrands')
  getAllBrands(){
    return this.facade.getAllBrands();
  }

  
}
