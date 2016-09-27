import { Customer, Product, Invoice, InvoiceItem, makeCustomer, makeProduct, makeInvoice, makeInvoiceItem } from '../classes';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs';


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
      id_url: (id, inv_id) => `/api/invoices/${inv_id}/items/${id}`, cls: InvoiceItem,
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
    Promise.all( [
      this.sub.customer.index()
      ,this.sub.product.index()
      ,this.sub.invoice.index()
    ] ).then(
      ( res ) => {
        var [ customers, products, invoices ] = res;
        this.customers = customers.map( makeCustomer );
        this.products = products.map( makeProduct );
        return Promise.all(
          [ Promise.resolve( invoices ) ]
          .concat(
            invoices.map( (iv)=>this.sub.item.index(iv.id) )
          )
        );
      }
    ).then(
      ( res ) => {
        var [ invoices, ...items ] = res;
        items = items[0].map( makeInvoiceItem );
        // 关联 Product 到 item
        for( var i in items ) {
          items[i].product = this.products.find(
                        (p)=>p.id==items[i].product_id
                      ); 
        }
        // 关联 Item 到 Invoice
        for( var i in invoices ) {
          invoices[i].items = items.filter(
                              (item)=>item.invoice_id==invoices[i].id
                            );
        }
        // 关联 Customer 到 invoice
        for( var i in invoices ) {
          invoices[i].customer = this.customers.find(
                                    (c)=>c.id==invoices[i].customer_id );
        }
        this.invoices = invoices.map( makeInvoice );
      }
    ).then( console.warn.bind( console, 'crud_service finish init;' ) );
    /*/
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
  //*/

  fetch(method: string, url: string, obj: T) {
    console.log(method, url);
    console.log('test', this.http[method](url, ['put','post'].includes(method) ? obj : undefined));
    return this.http[method](url, ['put','post'].includes(method) ? obj : undefined)
    .toPromise()
    .then(x => x.json() || [])
    .catch(handleError);
  }

}
