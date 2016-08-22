import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component, Input } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'invoice-detail',
  template: require('./invoice-detail.pug'),
  inputs: ['invoice'],
})
export class InvoiceDetailComp {
  @Input invoice: MyApp.Invoice;
  api = this.crud.sub.invoice;

  constructor (
    private crud: CrudService,
    // public router: Router,
    // private route: ActivatedRoute,
  ) {
    // window['invoice'] = this.invoice;
  }

  addItem() {
    this.crud.sub.item.new(this.invoice.id).then(item => {
      let arr = this.invoice.items || [];
      item = makeInvoiceItem(item);
      item.product = this.crud.products.find(x => x.id == item.product_id);
      console.log('addItem', item.product, this.crud.products, item.product_id);
      this.invoice.items = arr.concat(item);
    })
  }

}
