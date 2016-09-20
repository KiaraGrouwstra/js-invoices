import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/topromise';
let lodash = require('lodash');
let _ = require('lodash/fp');

function handleError (error: any) {
  let errMsg = (error.message) ? error.message : error.status ?
      error.status + ' - ' + error.statusText : 'Server error';
  console.error(errMsg);
  return Observable.throw(errMsg);
}

@Injectable()
export class CrudService {
  customers = [];
  products = [];
  invoices = [];
  items = [];

  sub = lodash.mapValues({
    customer: {
      url: () => '/api/customers',
      id_url: (id) => `/api/customers/${id}`,
      cls: Customer,
      fact: makeCustomer,
    },
    product: {
      url: () => '/api/products',
      id_url: (id) => `/api/products/${id}`,
      cls: Product,
      fact: makeProduct,
    },
    invoice: {
      url: () => '/api/invoices',
      id_url: (id) => `/api/invoices/${id}`,
      cls: Invoice,
      fact: makeInvoice,
    },
    item: {
      url: (id) => `/api/invoices/${id}/items`,
      id_url: (inv_id, id) => `/api/invoices/${inv_id}/items/${id}`,
      cls: InvoiceItem,
      fact: makeInvoiceItem,
    },
  }, (v, k) => {
    let plural = k+'s';
    let route = '/'+plural;
    let { url, id_url, cls, fact } = v;
    let index = (id) => this.fetch('get', url(id));
    let put = (obj, id) => this.fetch('put', id_url(obj.id, id), obj);
    let post = (obj, id) => this.fetch('post', url(id), obj)
    .then(x => {
      let merged = fact(_.assign(obj, x));
      // console.log('posted', x, obj, merged);
      this[plural] = this[plural].concat(merged);
      put(merged, id);
      // // jump back and forth to refresh the page
      // this.router.navigate([route, merged.id]);
      // this.router.navigate([route]);
      return merged;
    });
    return {
      url,
      id_url,
      cls,
      fact,
      // ...v,
      name: k,
      plural,
      route,
      index,
      post,
      new: (id) => post(fact({}), id),
      put,
      get: (id, id2) => this.fetch('get', id_url(id, id2)),
      del: (id, id2) => this.fetch('delete', id_url(id, id2))
      .then((del) => {
        console.info('deleted', del, [route, del.id]);
        // this.router.navigate([route, del.id]);
        // this.router.navigate([route]);
        this[plural] = this[plural].filter(x => x.id != del.id);
      }),
      populate: () => index()
      .then(x => {
        this[plural] = x.map(fact);
      }),
    };
  });

  constructor (
    private http: Http,
    private router: Router,
  ) {
    window['router'] = router;
    window['crud'] = this;
    this.sub.customer.populate();
    this.sub.product.populate();
    this.sub.invoice.index()
    .then(invoices => {
      this.invoices = invoices.map(invoice => {
        this.sub.customer.get(invoice.customer_id)
        .then(customer => {
          invoice.customer = customer;
        });
        this.sub.item.index(invoice.id)
        .then(items => {
          invoice.items = items.map(item => {
            item.product = this.products.find(product => product.id == item.product_id);
            return makeInvoiceItem(item);
          });
        });
        return makeInvoice(invoice);
      });
    });
  }

  fetch(method: string, url: string, obj: T) {
    console.log(method, url);
    return this.http[method](url, ['put','post'].includes(method) ? obj : undefined)
    .toPromise()
    .then(x => x.json() || [])
    .catch(handleError);
  }

}
