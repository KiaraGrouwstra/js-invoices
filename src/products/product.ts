import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product',
  template: require('./product.pug'),
  providers: [CrudService],
})
export class ProductComp {
  product: MyApp.Product;
  api = this.crud.sub.product;

  constructor (
    private route: ActivatedRoute,
    // public router: Router,
    private crud: CrudService,
  ) {}

   ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
        let id = +params['id'];
        this.crud.sub.product.get(id)
        .then(x => {
            this.product = makeProduct(x);
        });
      });
    }

}
