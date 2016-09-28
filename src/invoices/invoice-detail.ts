import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import InvoiceActionCreator from '../actions/invoice';

@Component({
  selector: 'invoice-detail',
  template: require('./invoice-detail.pug'),
  inputs: ['invoice'],
})
export class InvoiceDetailComp {
  @Input invoice: MyApp.Invoice;
  customers;
  //api = this.crud.sub.invoice;

  constructor (
    //private crud: CrudService,
    // public router: Router,
    // private route: ActivatedRoute,
    private store: Store,
    private action: InvoiceActionCreator
  ) {
    // window['invoice'] = this.invoice;
    this.customers = store.select('customers');
  }

  update( evt ) {
    this.store.dispatch( this.action.update( this.invoice ) );
  }

  create_item( evt ) {
    var it = new InvoiceItem(-1, this.invoice.id, -1, 1);
    this.store.dispatch( this.action.create_item( it ) );
  }

  remove( evt ) {
    this.store.dispatch( this.action.remove( this.invoice ) );
  }

}
