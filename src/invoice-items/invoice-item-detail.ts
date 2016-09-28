import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import InvoiceActionCreator from '../actions/invoice';

@Component({
  selector: 'invoice-item-detail',
  template: require('./invoice-item-detail.pug'),
  inputs: ['item'],
})
export class InvoiceItemDetailComp {
  @Input item: MyApp.InvoiceItem;
  //api = this.crud.sub.item;

  products;

  constructor (
    //private crud: CrudService,
    // public router: Router,
    // private route: ActivatedRoute,
    private store: Store,
    private action: InvoiceActionCreator
  ) {
    this.products = store.select('products');
  }

  update( evt ) {
    this.store.dispatch( this.action.update_item( this.item ) );
  }

  remove( evt ) {
    this.store.dispatch( this.action.remove_item( this.item ) );
  }

}
