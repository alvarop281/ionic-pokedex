import { Pokemon } from './models/Pokemon';
import { PokeData } from './models/PokeData';

export interface AppState{
    readonly device: boolean;
    readonly pokeList: Pokemon[];
    readonly pokeData: PokeData;
}