import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'invoice-item-detail',
  template: require('./invoice-item-detail.pug'),
  inputs: ['item'],
})
export class InvoiceItemDetailComp {
  @Input item: MyApp.InvoiceItem;
  api = this.crud.sub.item;

  constructor (
    private crud: CrudService,
    // public router: Router,
    // private route: ActivatedRoute,
  ) {}

  save(x): void {
    console.log('save', x);
    x.revenue = x.quantity * (x.product ? x.product.price : 0)
    if(x) this.api.put(x, x.invoice_id);
  }

}
