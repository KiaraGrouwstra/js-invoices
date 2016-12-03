// Shared

// import { NgModule, ModuleWithProviders } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import {MaterialModule} from '@angular/material/all/all';
// import { MdCoreModule } from '@angular/material/core';
// import { MdButtonModule } from '@angular/material/button';
// import { MdButtonToggleModule } from '@angular/material/button-toggle';
// import { MdCardModule } from '@angular/material/card';
// import { MdCheckboxModule } from '@angular/material/checkbox';
// import { MdGridListModule } from '@angular/material/grid-list';
// import { MdIconModule, MdIconRegistry } from '@angular/material/icon';
// import { MdInputModule } from '@angular/material/input';
// import { MdListModule } from '@angular/material/list';
// import { MdMenuModule } from '@angular/material/menu';
// import { MdProgressBarModule } from '@angular/material/progress-bar';
// import { MdProgressCircleModule } from '@angular/material/progress-circle';
// import { MdRadioModule } from '@angular/material/radio';
// import { MdSidenavModule } from '@angular/material/sidenav';
// import { MdSliderModule } from '@angular/material/slider';
// import { MdSlideToggleModule } from '@angular/material/slide-toggle';
// import { MdTabsModule } from '@angular/material/tabs';
// import { MdToolbarModule } from '@angular/material/toolbar';
// import { MdTooltipModule } from '@angular/material/tooltip';
// import { MdDialogModule } from '@angular/material/dialog/dialog';
import { MaterialModule } from '@angular/material';
import { AddDialog } from './invoices/invoice-customer-card';
import { AddDialogs } from './invoice-items/invoice-product-card';

import { CovalentCoreModule } from '@covalent/core';

// const MATERIAL = [
//   MdCoreModule,
//   MdButtonModule,
//   MdButtonToggleModule,
//   MdCardModule,
//   MdCheckboxModule,
//   MdGridListModule,
//   MdIconModule,
//   MdInputModule,
//   MdListModule,
//   MdMenuModule,
//   MdProgressBarModule,
//   MdProgressCircleModule,
//   MdRadioModule,
//   MdSidenavModule,
//   MdSliderModule,
//   MdSlideToggleModule,
//   MdTabsModule,
//   MdToolbarModule,
//   MdTooltipModule,
//   // MdDialogModule,
// ];

//i18n

import { TranslateModule } from 'ng2-translate';
//
// console.log(TranslateModule);
// console.log(Object.keys(TranslateModule));

// App

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared.module';
import { App } from './app/app';
import { CustomersComp } from './customers/customers';
import { InvoicesComp } from './invoices/invoices';
import { InvoiceItemsComp } from './invoice-items/invoice-items';
import { ProductsComp } from './products/products';
import { CustomerComp } from './customers/customer';
import { InvoiceComp } from './invoices/invoice';
import { InvoiceItemComp } from './invoice-items/invoice-item';
import { ProductComp } from './products/product';
import { CustomerDetailComp } from './customers/customer-detail';
import { InvoiceDetailComp } from './invoices/invoice-detail';
import { InvoiceItemDetailComp } from './invoice-items/invoice-item-detail';
import { ProductDetailComp } from './products/product-detail';

export const routes: Routes = [
  { path: 'customers', component: CustomersComp },
  { path: 'customers/:id', component: CustomerComp },
  { path: 'invoices', component: InvoicesComp },
  { path: 'invoices/:id', component: InvoiceComp },
  { path: 'products', component: ProductsComp },
  { path: 'products/:id', component: ProductComp },
  { path: 'invoices/:inv_id/items', component: InvoiceItemsComp },
  { path: 'invoices/:inv_id/items/:id', component: InvoiceItemComp },
  { path: '', redirectTo: 'invoices', pathMatch: 'full'},
];

// ./app/app.routing.ts
export const routing = RouterModule.forRoot(routes);

import { provideStore } from '@ngrx/store';
import reducers from './reducers';
import actions from './actions';
import { EffectsModule } from '@ngrx/effects';
import effects from './effects';

console.warn(TranslateModule.forRoot(),MaterialModule.forRoot(),CovalentCoreModule.forRoot(),0);

@NgModule({
  imports: [
    // HttpModule,
    TranslateModule.forRoot(),
    // FormsModule,
    // MATERIAL,
    MaterialModule.forRoot(),

    BrowserModule,
    SharedModule.forRoot(),
    routing,
    ...effects.map( EffectsModule.run ),

    CovalentCoreModule.forRoot(),

  ],

  declarations: [
    App,
    AddDialog,
    AddDialogs,
    CustomerDetailComp,
    ProductDetailComp,
    InvoiceDetailComp,
    InvoiceItemDetailComp,
    CustomersComp,
    ProductsComp,
    InvoicesComp,
    InvoiceItemsComp,
    CustomerComp,
    ProductComp,
    InvoiceComp,
    InvoiceItemComp,
  ],
  entryComponents: [
     AddDialog,
     AddDialogs,
   ],
  providers: [ provideStore(reducers), ...actions ],
  // providers: [ MdIconRegistry, provideStore(reducers), ...actions ],

  bootstrap: [App],
})

export class AppModule {}
