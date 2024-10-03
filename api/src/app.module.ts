import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './modules/Pokemon/pokemon.module';
import { BattleModule } from './modules/battle/battle.module';
import { dataSourceOptions } from './db/config/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PokemonModule,
    BattleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
