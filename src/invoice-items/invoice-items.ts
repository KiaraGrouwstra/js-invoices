import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'invoice-items',
  template: require('./invoice-items.pug'),
  providers: [CrudService],
})
export class InvoiceItemsComp {
  items: MyApp.InvoiceItem[];
  api = this.crud.sub.item;

  constructor (
    private route: ActivatedRoute,
    private crud: CrudService,
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.inv_id = +params['inv_id'];
      this.api.index(this.inv_id)
      .then(items => {
        this.items = items.map(makeInvoiceItem);
      });
    });
  }

}
