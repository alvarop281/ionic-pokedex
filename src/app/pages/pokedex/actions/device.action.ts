import { Action } from '@ngrx/store';

export const SET_DEVICE = '[DEVICE] Add';

export class SetDevice implements Action{
    readonly type = SET_DEVICE;
    constructor( public payload: boolean ){}
}

export type Actions = SetDevice;