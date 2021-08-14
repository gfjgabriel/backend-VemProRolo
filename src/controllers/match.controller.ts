import {Controller, Delete, Get, Param, UseGuards} from '@nestjs/common';
import { AuthorizerGuard } from '../auth/guards/cognito.guard'
import {MatchFacade} from "../facade/match.facade";
import {MatchDto} from "../entities/dtos/match/match.dto";

@Controller('matches')
export class MatchController {
  constructor(private readonly matchFacade: MatchFacade) {}

  @Get()
  @UseGuards(AuthorizerGuard)
  getAllCurrentUserMatches(): Promise<MatchDto[]> {
    return this.matchFacade.getAllCurrentUserMatches();
  }

  @Delete(':id')
  @UseGuards(AuthorizerGuard)
  deleteMatch(@Param('id') id: string): void {
    this.matchFacade.deleteMatch(id);
  }

}
