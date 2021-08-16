import { Injectable } from "@nestjs/common";
import { ModelService } from "src/services/model.service";

@Injectable()
export class ModelFacade {
    constructor(private readonly modelService: ModelService) {}

    getAllModels() {
        return this.modelService.getAllModels();
    }

}