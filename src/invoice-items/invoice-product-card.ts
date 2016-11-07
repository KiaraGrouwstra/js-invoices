import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import ProductActionCreator from '../actions/product';

import { Store } from '@ngrx/store';
import InvoiceActionCreator from '../actions/invoice';
import { MdDialogRef,MdDialog,MdDialogConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector'add-dialogs',
  template: require('./invoice-product-card.pug'),
  inputs: ['product'],
})
export class AddDialogs {
  product=({});
  constructor(
    private store: Store,
    private action: ProductActionCreator

    public dialogRef: MdDialogRef<AddDialogs>) { }

  create( evt ) {
    var c = new Product(-1, this.product.name, this.product.price);
    this.store.dispatch( this.action.create( c ) );
  }

}
