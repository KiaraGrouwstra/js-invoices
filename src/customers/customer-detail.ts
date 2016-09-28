import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import CustomerActionCreator from '../actions/customer';

@Component({
  selector: 'customer-detail',
  template: require('./customer-detail.pug'),
  inputs: ['customer'],
})
export class CustomerDetailComp {
  @Input customer;

  constructor (
    // public router: Router,
    private store: Store,
    private action: CustomerActionCreator
  ) {}

  update( evt ) {
    this.store.dispatch( this.action.update( this.customer ) );
  }

  remove( evt ) {
    this.store.dispatch( this.action.remove( this.customer ) );
  }

}
