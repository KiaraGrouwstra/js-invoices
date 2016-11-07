import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import InvoiceActionCreator from '../actions/invoice';
import { MdDialogRef,MdDialog,MdDialogConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';
import { AddDialog } from './invoice-customer-card';

@Component({
  styles: [
    '.dialog{display:flex;}',
    '[md-mini-fab]{display:flex;width:24px;height:24px;margin-left:10px;}',
    '.md-18{padding:0;}'
  ]
  selector: 'invoice-detail',
  template: require('./invoice-detail.pug'),
  inputs: ['invoice'],
})
export class InvoiceDetailComp {
  dialogRef:MdDialogRef<AddDialog>

  @Input invoice: MyApp.Invoice;

  products;

  customers;
  //api = this.crud.sub.invoice;

  constructor (
    public dialog :MdDialog,
    public viewContainerRef: ViewContainerRef,
    //private crud: CrudService,
    // public router: Router,
    // private route: ActivatedRoute,
    private store: Store,
    private action: InvoiceActionCreator
  ) {
    // window['invoice'] = this.invoice;
    this.customers = store.select('customers');
  }

  update( evt ) {
    this.store.dispatch( this.action.update( this.invoice ) );
  }

  create_item( evt ) {
    var it = new InvoiceItem(-1, this.invoice.id, -1, 1);
    this.store.dispatch( this.action.create_item( it ) );
  }

  remove( evt ) {
    this.store.dispatch( this.action.remove( this.invoice ) );
  }
  openDialog() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(AddDialog,config);

    this.dialogRef.afterClosed().subscribe(result =>{
      console.log('result: '+ result);
      this.dialogRef = null;
    });
  }

}
