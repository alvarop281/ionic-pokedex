import { Action } from '@ngrx/store';

import { PokeData } from '../../../models/PokeData';

export const SET_POKEDATA = '[POKEDATA] Set';

export class SetPokeData implements Action{
    readonly type = SET_POKEDATA;

    constructor( public payload: PokeData ) {}
}

export type Actions = SetPokeData;