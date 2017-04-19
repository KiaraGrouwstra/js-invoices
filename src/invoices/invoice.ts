import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'invoice',
  template: require('./invoice.pug'),
  providers: [CrudService],
})
export class InvoiceComp {
  invoice: MyApp.Invoice;
  items: MyApp.InvoiceItem[];
  api = this.crud.sub.invoice;

  constructor (
    private route: ActivatedRoute,
    private crud: CrudService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let inv_id = +params['inv_id'];
      let id = +params['id'];
      this.api.get(id, inv_id)
      .then(x => {
        this.item = makeInvoiceItem(x);
      });
      // this.crud.sub.item.index(id)
      // .then(x => {
      //   this.items = x;
      // });
      this.items = this.invoice.items;
    });
  }

}
