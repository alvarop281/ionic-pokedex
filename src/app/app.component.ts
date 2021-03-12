import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

// Store
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import * as DeviceActions from './pages/pokedex/actions/device.action';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mediaSub: Subscription;
  constructor(
    public mediaObserver: MediaObserver,
    private store: Store<AppState>

  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) =>{
      let value: boolean;
      
      result.mqAlias === 'xs' ? value = true : value = false;
      this.store.dispatch( new DeviceActions.SetDevice( value ));
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.mediaSub.unsubscribe();
  }
}
