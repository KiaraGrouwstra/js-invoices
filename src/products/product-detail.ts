import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import ProductActionCreator from '../actions/product';

@Component({
  selector: 'product-detail',
  template: require('./product-detail.pug'),
  inputs: ['product'],
})
export class ProductDetailComp {
  @Input product: MyApp.Product;

  constructor (
    // public router: Router,
    private store: Store,
    private productAction: ProductActionCreator
  ) {}

  product_update( evt ) {
    this.store.dispatch( this.productAction.update(this.product) );
  }

  product_remove( evt ) {
    this.store.dispatch( this.productAction.remove(this.product) );
  }

}
