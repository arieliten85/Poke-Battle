import { PokemonEntity } from 'src/modules/Pokemon/entities/pokemon.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('battle')
export class BattleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PokemonEntity)
  pokemon1: PokemonEntity;

  @ManyToOne(() => PokemonEntity)
  pokemon2: PokemonEntity;

  @ManyToOne(() => PokemonEntity)
  winner: PokemonEntity;

  @Column({ type: 'text', nullable: true })
  battleDetails: string;
}
