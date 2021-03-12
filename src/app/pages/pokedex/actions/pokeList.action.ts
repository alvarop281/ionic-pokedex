import { Action } from '@ngrx/store';

import { Pokemon } from '../../../models/Pokemon';

export const ADD_POKELIST = '[POKELIST] Add';

export class AddPokeList implements Action{
    readonly type = ADD_POKELIST;

    constructor( public payload: Pokemon ) {}
}

export type Actions = AddPokeList;