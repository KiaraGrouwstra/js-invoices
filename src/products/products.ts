import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products',
  template: require('./products.pug'),
  providers: [CrudService],
})
export class ProductsComp {
  products: MyApp.Product[];
  api = this.crud.sub.product;

  constructor (
    // public router: Router,
    private crud: CrudService,
  ) {}

}
