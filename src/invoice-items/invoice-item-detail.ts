import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import InvoiceActionCreator from '../actions/invoice';
import { MdDialogRef,MdDialog,MdDialogConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';
import { AddDialogs } from './invoice-product-card';
import { TdDialogService } from '@covalent/core';


@Component({
  styles: [
    '.dialog{display:flex;}',
    '[md-mini-fab]{display:flex;width:24px;height:24px;margin-left:10px;}',
    '.md-18{padding:0;}'
  ]
  selector: 'invoice-item-detail',
  template: require('./invoice-item-detail.pug'),
  inputs: ['item'],
})
export class InvoiceItemDetailComp {
  dialogRef:MdDialogRef<AddDialogs>;

  @Input item: MyApp.InvoiceItem;
  //api = this.crud.sub.item;

  products;

  constructor (
    public dialog :MdDialog,
    public viewContainerRef: ViewContainerRef,

    private _dialogService: TdDialogService,
    //private crud: CrudService,
    // public router: Router,
    // private route: ActivatedRoute,
    private store: Store,
    private action: InvoiceActionCreator
  ) {
    this.products = store.select('products');
  }

  update( evt ) {
    this.store.dispatch( this.action.update_item( this.item ) );
  }

  remove( evt ) {
    this.store.dispatch( this.action.remove_item( this.item ) );
  }
  openDialog() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(AddDialogs,config);

    this.dialogRef.afterClosed().subscribe(result =>{
      console.log('result: '+ result);
      this.dialogRef = null;
    });
  }
  openConfirm(): void {
    this._dialogService.openConfirm({
      message: 'To determine the deletion of this product?',
      viewContainerRef: this._viewContainerRef, //OPTIONAL if setDefaultViewContainerRef is used.
      title: 'Confirm', //OPTIONAL, hides if not provided
      cancelButton: 'Cancel', //OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Confirm', //OPTIONAL, defaults to 'ACCEPT'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
              this.remove()
      }
    });
  }
}
