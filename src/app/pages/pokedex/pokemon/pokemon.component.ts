import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

// Models
import { PokeData } from '../../../models/PokeData';

// Store
import { Store } from '@ngrx/store';
import { AppState } from './../../../app.state';

// Services
import { PokeDataService } from '../services/poke-data.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {

  pokemonSelected: Observable<PokeData>;
  pokemon: PokeData;
  deviceXs: boolean = false;
  img: string = environment.fullImg;
  imgEvolution: string = environment.scrollImg;
  pokemonType: string[] = [];
  constructor(
    private store: Store<AppState>,                   // Store
    private _pokeDataService: PokeDataService
  ) { 
    this.pokemonSelected = this.store.select('pokeData');
    
    this.store.select('device').subscribe(res => {
      this.deviceXs = res;
    });
  }

  ngOnInit() {
    this.pokemonSelected.subscribe(
      res=>{
        this.pokemon = res;

        this.pokemonType = [];
        this.pokemon.types.forEach(element => {
          this.pokemonType.push(element['type']['name'])
        });
      }
    )
  }

  _selected(id: string){
    this._pokeDataService.getPokeDate(id);
  }

}
