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
    // 关联 invoice_item 到 invoice;
    this.invoices = store.select('invoices')
                    .flatMap(
                      ( invoices ) => {
                        invoices = invoices || [];
                        return store.select('invoice_items').map(
                          ( items ) => {
                            items = items || [];
                            return invoices.map(
                              ( invoice ) => {
                                invoice.items = items.filter( (it)=>it.invoice_id==invoice.id );
                                return invoice;
                              }
                            );
                          }
                        );
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
