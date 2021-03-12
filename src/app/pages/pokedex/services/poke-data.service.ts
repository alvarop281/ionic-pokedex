import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import {Router} from '@angular/router';

// models
import { PokeData } from '../../../models/PokeData';

// Store
import { Store } from '@ngrx/store';
import { AppState } from './../../../app.state';
import * as PDActions from '../actions/pokeData.action';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  uri: string = environment.pokeInfo;
  pokemonSpecies: string = environment.pokemonSpecies;
  constructor(
    private _http: HttpClient,
    private router:Router,
    private store: Store<AppState>,                   // Store
  ) { }

  getPokeDate(id: string){
    this._http.get(this.uri + id)
        .subscribe(res =>{
          
          let newPokemon: PokeData = {
            height: res['height'],
            id: res['id'],
            name: res['name'],
            types: res['types'],
            weight: res['weight']
          }

          this._species(newPokemon);

        }, error =>{
          this.router.navigate(['404']);
        })
  }

  _species(pokemon: PokeData){
    this._http.get(this.pokemonSpecies + pokemon.id)
      .subscribe(res=>{
        
        this._evolution(res['evolution_chain']['url'], pokemon)

      },error =>{
        this.router.navigate(['404']);
      })
  }

  _evolution(uri: string, pokemon: PokeData){
    this._http.get(uri)
    .subscribe(res=>{
      
      this._evolutionChain(res['chain'], pokemon)

    },error =>{
      this.router.navigate(['404']);
    })
  }

  _evolutionChain(res, pokemon: PokeData){

    let chain: string[] =[];

    if(res['species']['url']){
      chain.push(this._getID(res['species']['url']));

      if(res['evolves_to'][0]  !== undefined ){
        chain.push(this._getID( res['evolves_to'][0]['species']['url']) );
      
        if(res['evolves_to'][0]['evolves_to'][0]){
          chain.push(this._getID( res['evolves_to'][0]['evolves_to'][0]['species']['url']) );
        
        }
        
      }
    }
    
    pokemon.evolution = chain;
    
    this.store.dispatch( new PDActions.SetPokeData( pokemon ) );

  }

  _getID(text: string): string{
    let id: string = text;
    id = id.slice(42).replace("/", "");
    return id;
  }
}
