import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import InvoiceActionCreator from '../actions/invoice';
import Rx from 'rxjs';

@Component({
  selector: 'invoices',
  template: require('./invoices.pug')
  //,providers: [CrudService]
})
export class InvoicesComp {
  invoices; // Observable< MyApp.Invoice[] >

  //products: MyApp.Product[];

  constructor (
    // public router: Router,
    private store: Store,
    private action: InvoiceActionCreator
  ) {
    // this.products = store.select('products');
    var prop = ( x ) => ( ctx ) => ctx[x];
    // 关联 invoice_item 到 invoice;
    this.invoices = Rx.Observable.combineLatest(
                      store.map( prop('invoices') )
                      ,store.map( prop('invoice_items') )
                      ,store.map( prop('products') )
                      ,( invoices, invoice_items, products ) => [ invoices||[], invoice_items||[], products||[] ]
                    ).map(
                      ( res ) => {

                        let [ invoices, items, products ] = res;

                        items = items.map( (it) => {
                          var p = products.find( (p)=>p.id == it.product_id );
                          it.revenue = p ? (p.price * it.quantity).toFixed(2) / 1 : 0;
                          return it;
                        } );

                        invoices = invoices.map( (invoice) => {
                          invoice.items = items.filter( (it)=>it.invoice_id == invoice.id );
                          invoice.total = invoice.items.reduce(
                            ( a, b ) => {
                              return { revenue: a.revenue + b.revenue };
                            }
                            ,{ revenue: 0 }
                          ).revenue * ( 1 - invoice.discount / 100 );
                          return invoice;
                        } );

                        return invoices;

                      }
                    );

  }

  ngOnInit() {
    this.store.dispatch( this.action.search() );
    this.store.dispatch( this.action.search_item() );
  }

  create( evt ) {
    var i = new Invoice(-1, -2, 0, 0, []);
    this.store.dispatch( this.action.create(i) );
  }

}
