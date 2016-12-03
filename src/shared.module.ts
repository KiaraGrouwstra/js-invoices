import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import {MaterialModule} from '@angular/material/all/all';
import { MdCoreModule } from '@angular/material/core';
import { MdButtonModule } from '@angular/material/button';
import { MdButtonToggleModule } from '@angular/material/button-toggle';
import { MdCardModule } from '@angular/material/card';
import { MdCheckboxModule } from '@angular/material/checkbox';
import { MdGridListModule } from '@angular/material/grid-list';
import { MdIconModule } from '@angular/material/icon';
import { MdInputModule } from '@angular/material/input';
import { MdListModule } from '@angular/material/list';
import { MdMenuModule } from '@angular/material/menu';
import { MdProgressBarModule } from '@angular/material/progress-bar';
import { MdProgressCircleModule } from '@angular/material/progress-circle';
import { MdRadioModule } from '@angular/material/radio';
import { MdSidenavModule } from '@angular/material/sidenav';
import { MdSliderModule } from '@angular/material/slider';
import { MdSlideToggleModule } from '@angular/material/slide-toggle';
import { MdTabsModule } from '@angular/material/tabs';
import { MdToolbarModule } from '@angular/material/toolbar';
import { MdTooltipModule } from '@angular/material/tooltip';
// import { MdDialogModule } from '@angular/material/dialog/dialog';

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

import {
  CrudService,
//   CustomersService,
//   ProductsService,
//   InvoicesService,
//   // customersServiceProvider,
//   // productsServiceProvider,
//   // invoicesServiceProvider,
} from './services';
// import { CONFIG, APP_CONFIG } from './config';
import { PIPE_PROVIDERS } from './lib/pipes';
// import { Directive } from './directives';

@NgModule({
  imports: [
    // CommonModule,  // feature modules and lazy loaded modules
    // routing,
    HttpModule,
  ],
  declarations: [
    //Pipes: [PIPE_PROVIDERS],
    // Directives:
  ],
  providers: [
  //   // customersServiceProvider,
  //   // productsServiceProvider,
  //   // invoicesServiceProvider,
  //   CustomersService,
  //   ProductsService,
  //   InvoicesService,
    CrudService,
  ],
  // bootstrap: [], // app
  exports: [  // feature module, even if not in imports/declarations
    HttpModule,
    FormsModule,
    //...MATERIAL,
    // Pipes:
    // Directives:
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // // customersServiceProvider,
        // // productsServiceProvider,
        // // invoicesServiceProvider,
        // CustomersService,
        // ProductsService,
        // InvoicesService,
        CrudService,
      ],
    };
  }
}
