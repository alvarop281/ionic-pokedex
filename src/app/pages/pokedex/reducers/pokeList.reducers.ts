import { Pokemon } from '../../../models/Pokemon';

import * as PLActions from '../actions/pokeList.action';

const initialState: Pokemon[] = [];

export function PokeListReducer( state: Pokemon[] = initialState, action: PLActions.Actions ) {
    switch( action.type ){
        case PLActions.ADD_POKELIST: 
            return [...state, action.payload];
        default:
            return state;
    }
}