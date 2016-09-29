import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import {MaterialModule} from '@angular2-material/all/all';
import { MdCoreModule } from '@angular2-material/core';
import { MdButtonModule } from '@angular2-material/button';
import { MdButtonToggleModule } from '@angular2-material/button-toggle';
import { MdCardModule } from '@angular2-material/card';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdIconModule } from '@angular2-material/icon';
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
    ...MATERIAL,
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
