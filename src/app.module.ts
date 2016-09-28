// Shared

// import { NgModule, ModuleWithProviders } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import {MaterialModule} from '@angular2-material/all/all';
import { MdCoreModule } from '@angular2-material/core';
import { MdButtonModule } from '@angular2-material/button';
import { MdButtonToggleModule } from '@angular2-material/button-toggle';
import { MdCardModule } from '@angular2-material/card';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdMenuModule } from '@angular2-material/menu';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdRadioModule } from '@angular2-material/radio';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdSliderModule } from '@angular2-material/slider';
import { MdSlideToggleModule } from '@angular2-material/slide-toggle';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdTooltipModule } from '@angular2-material/tooltip';
// import { MdDialogModule } from '@angular2-material/dialog/dialog';

const MATERIAL = [
  MdCoreModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressCircleModule,
  MdRadioModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  // MdDialogModule,
];

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

@NgModule({
  imports: [
    // HttpModule,
    // FormsModule,
    MATERIAL,

    BrowserModule,
    SharedModule.forRoot(),
    routing,
    ...effects.map( EffectsModule.run )
  ],
  declarations: [
    App,
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
  providers: [ MdIconRegistry, provideStore(reducers), ...actions ],
  bootstrap: [App],
})
export class AppModule {}
