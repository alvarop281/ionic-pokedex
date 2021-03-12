import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// FlexLayout
import { FlexLayoutModule } from '@angular/flex-layout';
// Store 
import { StoreModule } from '@ngrx/store';
import { DeviceReducer } from './pages/pokedex/reducers/device.reducer';
import { PokeListReducer } from './pages/pokedex/reducers/pokeList.reducers';
import { PokeDataReducer } from './pages/pokedex/reducers/pokeData.reducer';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    StoreModule.forRoot({
      device: DeviceReducer,
      pokeList: PokeListReducer,
      pokeData: PokeDataReducer
    }),
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
