import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import Rx from 'rxjs';

import { Store } from '@ngrx/store';

import InvoiceActionCreator from '../actions/invoice';
import ProductActionCreator from '../actions/product';
import CustomerActionCreator from '../actions/customer';

@Injectable()
export default class ProductEffects {
    
    @Effect() search$;

    @Effect() create$;

    @Effect() update$;

    @Effect() remove$;

    @Effect() search_item$;

    @Effect() create_item$;

    @Effect() update_item$;

    @Effect() remove_item$;

    constructor(
        private http: Http,
        private actions$: Actions,
        private store: Store,
        private invoiceAction: InvoiceActionCreator,
        private productAction: ProductActionCreator,
        private customerAction: CustomerActionCreator
    ) {
        var toJson = ( res ) => res.json();

        var toReq = ( method ) => ( act ) => this.http[method](['', 'api', 'invoices', act.payload.id].join('/'), act.payload);

        var not = ( x ) => !x;

        this.search$ = actions$.ofType( InvoiceActionCreator.SEARCH )
                        .flatMap( () => this.http.get('/api/invoices') )
                        .map( toJson )
                        .map( invoiceAction.search_result )
                        .merge(
                            store.select('products').flatMap(
                                ( products ) => {
                                    return Rx.Observable.if( ()=>!products, Rx.Observable.of( productAction.search() ) ); 
                                }
                            )
                            ,store.select('customer').flatMap(
                                ( customer ) => {
                                    return Rx.Observable.if( ()=>!customer, Rx.Observable.of( customerAction.search() ) );
                                }
                            )
                        );

        this.create$ = actions$.ofType( InvoiceActionCreator.CREATE )
                        //.flatMap( toReq('post') )
                        // 不用 :id
                        .flatMap( (act)=>this.http.post('/api/invoices', act.payload) )
                        .map( toJson )
                        .map( invoiceAction.create_result );

        this.update$ = actions$.ofType( InvoiceActionCreator.UPDATE )
                        .flatMap( toReq('put') )
                        .map( toJson )
                        .map( invoiceAction.update_result );

        this.remove$ = actions$.ofType( InvoiceActionCreator.REMOVE )
                        .flatMap( toReq('delete') )
                        .map( toJson )
                        .map( invoiceAction.remove_result )

        var toItemUrl = ( method ) => ( act ) => this.http[method]( ['', 'api', 'items', act.payload.id].join('/'), act.payload );

        this.search_item$ = actions$.ofType( InvoiceActionCreator.SEARCH_ITEM )
                        .flatMap( () => this.http.get('/api/items') )
                        .map( toJson )
                        .map( invoiceAction.search_item_result );

        this.create_item$ = actions$.ofType( InvoiceActionCreator.CREATE_ITEM )
                        .flatMap( (act)=>this.http.post('/api/items/', act.payload) )
                        .map( toJson )
                        .map( invoiceAction.create_item_result );

        this.update_item$ = actions$.ofType( InvoiceActionCreator.UPDATE_ITEM )
                        .flatMap( toItemUrl('put') )
                        .map( toJson )
                        .map( invoiceAction.update_item_result );

        this.remove_item$ = actions$.ofType( InvoiceActionCreator.REMOVE_ITEM )
                        .flatMap( toItemUrl('delete') )
                        .map( toJson )
                        .map( invoiceAction.remove_item_result )

    }

}