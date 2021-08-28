import { Injectable } from "@nestjs/common";
import { BrandService } from "src/services/brand.service";

@Injectable()
export class BrandFacade {
    constructor(private readonly brandService: BrandService) {}

    getAllBrands() {
        return this.brandService.getAllBrands();
    }

}