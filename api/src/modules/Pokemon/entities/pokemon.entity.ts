import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pokemon')
export class PokemonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  attack: number;

  @Column({ type: 'int' })
  defense: number;

  @Column({ type: 'int' })
  hp: number;

  @Column({ type: 'int' })
  speed: number;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  imageUrl: string;
}
