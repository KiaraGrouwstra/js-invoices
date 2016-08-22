import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-detail',
  template: require('./product-detail.pug'),
  inputs: ['product'],
})
export class ProductDetailComp {
  @Input product: MyApp.Product;
  api = this.crud.sub.product;

  constructor (
    private crud: CrudService,
    // public router: Router,
  ) {}

}
