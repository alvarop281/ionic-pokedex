import * as DeviceAction from '../actions/device.action';

const initialState: boolean = false;

export function DeviceReducer( state: boolean = initialState, action: DeviceAction.Actions ){
    switch( action.type ){
        case DeviceAction.SET_DEVICE:
            return state = action.payload;
        default:
            return state;
    }
}