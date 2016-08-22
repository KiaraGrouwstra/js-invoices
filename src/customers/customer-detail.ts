import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'customer-detail',
  template: require('./customer-detail.pug'),
  inputs: ['customer'],
})
export class CustomerDetailComp {
  @Input customer: MyApp.Customer;
  api = this.crud.sub.customer;

  constructor (
    private crud: CrudService,
    // public router: Router,
  ) {}

}
