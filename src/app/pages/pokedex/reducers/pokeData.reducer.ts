import { PokeData } from '../../../models/PokeData';

import * as PDActions from '../actions/pokeData.action';

const initialState: PokeData = {
    id: '',
    name: '',
    height: '',
    weight: '',
    types: []
};

export function PokeDataReducer( state: PokeData = initialState, action: PDActions.Actions ) {
    switch( action.type ){
        case PDActions.SET_POKEDATA: 
            return state = action.payload;
        default:
            return state;
    }
}