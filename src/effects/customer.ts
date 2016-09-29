import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs';

import CustomerActionCreator from '../actions/customer';

@Injectable()
export default class ProductEffects {

    @Effect() detail$;
    
    @Effect() search$;

    @Effect() create$;

    @Effect() update$;

    @Effect() remove$;

    constructor(
        private http: Http,
        private actions$: Actions,
        customerAction: CustomerActionCreator
    ) {
        var toJson = ( res ) => res.json();

        var toReq = ( method ) => ( act) => this.http[method](['', 'api', 'customers', act.payload.id].join('/'), act.payload);

        this.detail$ = actions$.ofType( CustomerActionCreator.DETAIL )
                        .flatMap( toReq('get'))
                        .map( toJson )
                        .map( customerAction.detail_result );

        this.search$ = actions$.ofType( CustomerActionCreator.SEARCH )
                        .flatMap( () => this.http.get('/api/customers') )
                        .map( toJson )
                        .map( customerAction.search_result );

        this.create$ = actions$.ofType( CustomerActionCreator.CREATE )
                        //.flatMap( toReq('post') )
                        // 不用 :id
                        .flatMap( (act)=>this.http.post('/api/customers', act.payload) )
                        .map( toJson )
                        .map( customerAction.create_result );

        this.update$ = actions$.ofType( CustomerActionCreator.UPDATE )
                        .flatMap( toReq('put') )
                        .map( toJson )
                        .map( customerAction.update_result );

        this.remove$ = actions$.ofType( CustomerActionCreator.REMOVE )
                        .flatMap( toReq('delete') )
                        .map( toJson )
                        .map( customerAction.remove_result )
    }

}