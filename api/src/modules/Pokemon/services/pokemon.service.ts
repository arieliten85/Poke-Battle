import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonEntity } from '../entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: Repository<PokemonEntity>,
  ) {}

  async findAll(): Promise<PokemonEntity[]> {
    const allPokemon = await this.pokemonRepository.find();

    return allPokemon;
  }
}
