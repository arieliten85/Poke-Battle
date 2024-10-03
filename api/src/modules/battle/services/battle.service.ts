import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BattleEntity } from '../entities/battle.entity';
import { Repository } from 'typeorm';
import { PokemonEntity } from '../../Pokemon/entities/pokemon.entity';
import { CreateBattleDto } from '../dto/create-battle.dto';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: Repository<PokemonEntity>,
    @InjectRepository(BattleEntity)
    private readonly battleRepository: Repository<BattleEntity>,
  ) {}

  async findAll(): Promise<BattleEntity[]> {
    const allBattle = await this.battleRepository.find({
      relations: ['pokemon1', 'pokemon2', 'winner'],
    });

    return allBattle;
  }

  async create(pokemonIds: CreateBattleDto): Promise<BattleEntity> {
    if (pokemonIds.pokemon1Id === pokemonIds.pokemon2Id) {
      throw new BadRequestException('Cannot battle the same Pokémon');
    }

    const pokemon1 = await this.pokemonRepository.findOne({
      where: { id: pokemonIds.pokemon1Id },
    });
    const pokemon2 = await this.pokemonRepository.findOne({
      where: { id: pokemonIds.pokemon2Id },
    });

    if (!pokemon1 || !pokemon2) {
      throw new NotFoundException('One or both Pokémon were not found');
    }

    let battleDetails = '';
    let attacker = pokemon1;
    let defender = pokemon2;

    // Determinar quién ataca primero basado en la velocidad
    if (
      pokemon2.speed > pokemon1.speed ||
      (pokemon2.speed === pokemon1.speed && pokemon2.attack > pokemon1.attack)
    ) {
      attacker = pokemon2;
      defender = pokemon1;
    }

    // Simular turnos hasta que uno de los Pokémon se quede sin HP
    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      // Calcular daño
      const damage = Math.max(attacker.attack - defender.defense, 1);

      // Restar HP al defensor
      defender.hp -= damage;
      battleDetails += `${attacker.name} dealt ${damage} damage to ${defender.name}. `;

      // Verificar si el defensor ha sido derrotado
      if (defender.hp <= 0) {
        battleDetails += `${defender.name} has fainted! `;
        break;
      }

      // Intercambiar roles (turnos)
      [attacker, defender] = [defender, attacker];
    }

    // Determinar el ganador
    const winner = pokemon1.hp > 0 ? pokemon1 : pokemon2;

    const newBattle = this.battleRepository.create({
      pokemon1,
      pokemon2,
      winner,
      battleDetails,
    });

    return this.battleRepository.save(newBattle);
  }
}
