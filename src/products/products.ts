import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import ProductActionCreator from '../actions/product';

@Component({
  selector: 'products',
  template: require('./products.pug'),
  providers: [CrudService],
})
export class ProductsComp {
  products;

  constructor (
    // public router: Router,
    private store: Store,
    private productAction: ProductActionCreator
  ) {
    this.products = store.select('products');
  }

  ngOnInit() {
    this.store.dispatch( this.productAction.search() );
  }

  create_product( evt ) {
    var p = new Product();
    p.id = -1;
    p.name = 'Snazzy Widget';
    p.price = 100;
    this.store.dispatch( this.productAction.create(p) );
  }

}
