import { Action } from '@ngrx/store';

var toActionType = ( desc ) => [ '[customer]',' ',desc ].join('');
var toActionCreator = ( type ) => ( payload:any ):Action => { return {type:type, payload:payload}; };


export default class CustomerActionCreator {

    static CREATE = toActionType('create');
    static CREATE_RESULT = toActionType('create_result');

    static UPDATE = toActionType('update');
    static UPDATE_RESULT = toActionType('update_result');

    static REMOVE = toActionType('remove');
    static REMOVE_RESULT = toActionType('remove_result');

    static SEARCH = toActionType('search');
    static SEARCH_RESULT = toActionType('search_result');

    create;
    create_result;

    update;
    update_result;

    remove;
    remove_result;

    search;
    search_result;

    constructor() {
        [
            'create',
            'update',
            'remove',
            'search'
        ].map( function( x ) {
            return [ x, [x, 'result'].join('_') ];
        } ).reduce( function( l, r ) {
            return l.concat( r );
        }, [] ).forEach(
            ( k ) => {
                var t = this.constructor[ k.toUpperCase() ];
                this[k] = toActionCreator( t );
            }
        );
    }

}