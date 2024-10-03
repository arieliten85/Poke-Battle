import { Controller, Post, Body, Get } from '@nestjs/common';

import { CreateBattleDto } from '../dto/create-battle.dto';
import { BattleService } from '../services/battle.service';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Get()
  findAll() {
    return this.battleService.findAll();
  }

  @Post()
  create(@Body() createBattleDto: CreateBattleDto) {
    return this.battleService.create(createBattleDto);
  }
}
