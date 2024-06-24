import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { log } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdpter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdpter,
  ) {}
  

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons;
    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    const pokemontoInsert: { name: string, no: number} [] = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];
      //const pokemon = await this.pokemonModel.create({name, no });
      pokemontoInsert.push({ name, no });
    })
    await this.pokemonModel.insertMany(pokemontoInsert);
    return 'Seed Executed';
  }
}
