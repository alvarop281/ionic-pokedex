import { Component, OnInit } from '@angular/core';
import { PokeListService } from './services/poke-list.service';
import { PokeDataService } from './services/poke-data.service';

// Store
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  deviceXs: boolean = false;
  constructor(
    private store: Store<AppState>,                   // Store
    private _pokeListService: PokeListService,
    private _pokeDataService: PokeDataService
  ) { }

  ngOnInit() {
    this._pokeListService.getPokeList(0);
    this._pokeDataService.getPokeDate('1');
    
    this.store.select('device').subscribe(res => {
      this.deviceXs = res;
    });
  }

}
