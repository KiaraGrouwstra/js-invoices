import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'customers',
  template: require('./customers.pug'),
  providers: [CrudService],
})
export class CustomersComp {
  customers: MyApp.Customer[];
  api = this.crud.sub.customer;

  constructor (
    // public router: Router,
    private crud: CrudService,
  ) {}

}
