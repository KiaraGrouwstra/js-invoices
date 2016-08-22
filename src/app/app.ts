import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';

@Component({
  selector: 'app',
  template: require('./app.pug'),
})
export class App {
  customers: MyApp.Customer[];
  products: MyApp.Product[];
  invoices: MyApp.Invoice[];
  // items: MyApp.InvoiceItem[];

}
