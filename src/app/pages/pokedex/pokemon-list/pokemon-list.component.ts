import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IonInfiniteScroll } from '@ionic/angular';

// Models
import { Pokemon } from '../../../models/Pokemon';

// Store
import { Store } from '@ngrx/store';
import { AppState } from './../../../app.state';

// Services
import { PokeListService } from '../services/poke-list.service';
import { PokeDataService } from '../services/poke-data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  pokeData: Observable<Pokemon[]>;
  pokeList: Pokemon[] = [];
  deviceXs: boolean = false;
  imgUri: string = environment.scrollImg;
  constructor(
    private store: Store<AppState>,
    private _pokeInfoService: PokeListService,
    private _pokeDataService: PokeDataService
  ) { 
    this.pokeData = store.select('pokeList');
  }

  ngOnInit() {
    // Get poke data
    this.pokeData.subscribe(res =>{
      this.pokeList = res;
    });

    this.store.select('device').subscribe(res => {
      this.deviceXs = res;
    });
  }

  loadData(event){
    setTimeout(() => {

      this._pokeInfoService.getPokeList( this.pokeList.length );
        event.target.complete();

      if (this.pokeList.length == 1118) {
        event.target.disabled = true;
      }
    }, 500);
  }

  _selected(id: string){
    this._pokeDataService.getPokeDate(id);
  }
}
