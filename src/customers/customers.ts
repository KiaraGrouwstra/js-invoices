import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import CustomerActionCreator from '../actions/customer';

@Component({
  selector: 'customers',
  template: require('./customers.pug')
})
export class CustomersComp {
  customers;

  constructor (
    // public router: Router,
    private store: Store,
    private action: CustomerActionCreator
  ) {
    this.customers = store.select('customers');
  }

  ngOnInit() {
    this.store.dispatch( this.action.search() );
  }

  create( evt ) {
    var c = new Customer(-1, 'John Doe', 'Lane Str. 123', '012456789');
    this.store.dispatch( this.action.create( c ) );
  }

}
