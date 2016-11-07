import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import CustomerActionCreator from '../actions/customer';

import { Store } from '@ngrx/store';
import InvoiceActionCreator from '../actions/invoice';
import { MdDialogRef,MdDialog,MdDialogConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector'add-dialog',
  template: require('./invoice-customer-card.pug'),
  inputs: ['customer'],
})
export class AddDialog {
  customer=({});
  constructor(
    private store: Store,
    private action: CustomerActionCreator

    public dialogRef: MdDialogRef<AddDialog>) { }

  create( evt ) {
    var c = new Customer(-1, this.customer.name, this.customer.address, this.customer.phone);
    this.store.dispatch( this.action.create( c ) );
  }
  



}
