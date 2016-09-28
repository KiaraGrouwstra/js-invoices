import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs';

import ProductActionCreator from '../actions/product';

@Injectable()
export default class ProductEffects {
    
    @Effect() search$;

    @Effect() create$;

    @Effect() update$;

    @Effect() remove$;

    constructor(
        private http: Http,
        private actions$: Actions,
        productAction: ProductActionCreator
    ) {
        var toJson = ( res ) => res.json();

        var toReq = ( method ) => ( act) => this.http[method](['', 'api', 'products', act.payload.id].join('/'), act.payload);

        this.search$ = actions$.ofType( ProductActionCreator.SEARCH )
                        .flatMap( () => this.http.get('/api/products') )
                        .map( toJson )
                        .map( productAction.search_result );

        this.create$ = actions$.ofType( ProductActionCreator.CREATE )
                        //.flatMap( toReq('post') )
                        // 不用 :id
                        .flatMap( (act)=>this.http.post('/api/products', act.payload) )
                        .map( toJson )
                        .map( productAction.create_result );

        this.update$ = actions$.ofType( ProductActionCreator.UPDATE )
                        .flatMap( toReq('put') )
                        .map( toJson )
                        .map( productAction.update_result );

        this.remove$ = actions$.ofType( ProductActionCreator.REMOVE )
                        .flatMap( toReq('delete') )
                        .map( toJson )
                        .map( productAction.remove_result )
    }

}