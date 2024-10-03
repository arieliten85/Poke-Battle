import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleEntity } from './entities/battle.entity';
import { PokemonEntity } from '../Pokemon/entities/pokemon.entity';
import { BattleService } from './services/battle.service';
import { BattleController } from './controllers/battle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BattleEntity, PokemonEntity])],
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule {}
