import { Action, Dispatcher } from '@ngrx/store';

import pac from '../actions/product';

var table = {
    [ pac.SEARCH_RESULT ]: ( state, action ) => {
        return { products: action.payload };
    }
    ,[ pac.CREATE_RESULT ]: ( state, action ) => {
        return { products: (state.products || []).concat(action.payload) };
    }
    ,[ pac.REMOVE_RESULT ]: ( state, action ) => {
        return { products: (state.products || []).filter( (p)=>p.id!=action.payload.id ) }; 
    }
};

export default function( state, action: Action ) {
    console.warn( '>reducer', state, action );
    var next = action.type in table && table[ action.type ]( state, action ) || {};
    return Object.assign( {}, state, next );
};