import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'invoices',
  template: require('./invoices.pug'),
  providers: [CrudService],
})
export class InvoicesComp {
  invoices: MyApp.Invoice[];
  api = this.crud.sub.invoice;
  products: MyApp.Product[];

  constructor (
    // public router: Router,
    private crud: CrudService,
  ) {}

}
