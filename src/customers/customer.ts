import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import CustomerActionCreator from '../actions/customer';

@Component({
  selector: 'customer',
  template: require('./customer.pug'),
  providers: [CrudService],
})
export class CustomerComp {
  customer: MyApp.Customer;
  invoices: MyApp.Invoice[];
  api = this.crud.sub.customer;

  constructor (
    private action : CustomerActionCreator,
    private store: Store,
    private route: ActivatedRoute,
    //private crud: CrudService,
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.store.dispatch( this.action.detail( new Customer( id,'','','') ))

     /* this.api.get(id)
      .then(x => {
        this.customer = makeCustomer(x);
      });
      this.crud.sub.invoice.index()
      .then(x => {
        this.invoices = x.filter(y => y.customer_id == id);
      });   */
    });
  }

}
