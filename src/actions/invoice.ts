import { Action } from '@ngrx/store';

var toActionType = ( desc ) => [ '[invoice]',' ',desc ].join('');
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

    static CREATE_ITEM = toActionType('create_item');
    static CREATE_ITEM_RESULT = toActionType('create_item_result');

    static UPDATE_ITEM = toActionType('update_item');
    static UPDATE_ITEM_RESULT = toActionType('update_item_result');

    static REMOVE_ITEM = toActionType('remove_item');
    static REMOVE_ITEM_RESULT = toActionType('remove_item_result');

    static SEARCH_ITEM = toActionType('search_item');
    static SEARCH_ITEM_RESULT = toActionType('search_item_result');

    create;
    create_result;

    update;
    update_result;

    remove;
    remove_result;

    search;
    search_result;

    create_item;
    create_item_result;

    update_item;
    update_item_result;

    remove_item;
    remove_item_result;

    search_item;
    search_item_result;

    constructor() {
        [
            'create',
            'update',
            'remove',
            'search',

            'create_item',
            'update_item',
            'remove_item',
            'search_item',
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