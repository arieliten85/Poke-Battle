import { DataSource, DataSourceOptions } from 'typeorm';
import { BattleEntity } from '../../modules/battle/entities/battle.entity';
import { PokemonEntity } from '../../modules/Pokemon/entities/pokemon.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [PokemonEntity, BattleEntity],
  synchronize: false,
  logging: false,
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
