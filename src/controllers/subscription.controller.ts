import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {AuthorizerGuard} from '../auth/guards/cognito.guard'
import {VehicleFacade} from 'src/facade/vehicle.facade';
import {VehicleDto} from 'src/entities/dtos/vehicle/vehicle.dto';
import {VehicleUpdateDto} from 'src/entities/dtos/vehicle/vehicle-update.dto';
import {VehicleCreateDto} from 'src/entities/dtos/vehicle/vehicle-create.dto';
import {Report} from "../entities/report.entity";
import {ReportCreateDto} from "../entities/dtos/report/report-create.dto";
import {ReportFacade} from "../facade/report.facade";
import {SubscriptionFacade} from "../facade/subscription.facade";
import {SubscriptionCreateDto} from "../entities/dtos/subscription/subscription-create.dto";

@Controller('subscriptions')
@UseGuards(AuthorizerGuard)
export class SubscriptionController {
    constructor(private readonly facade: SubscriptionFacade) {
    }

    @Post()
    create(@Body() dto: SubscriptionCreateDto) {
        return this.facade.createSubscription(dto);
    }

    @Get()
    getCurrentUserSubscription() {
        return this.facade.getCurrentUserSubscription();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.facade.findOne(id);
    }

    @Delete(':id')
    cancelCurrentUserSubscription(@Param('id') id: number) {
        return this.facade.cancelCurrentUserSubscription(id);
    }

}
