import { Component } from '@angular/core';
import { CrudService } from '../services/crud_service';

import { TranslateService } from 'ng2-translate';
import { En } from '../i18n/en';
import { Cn } from '../i18n/cn';

@Component({
  selector: 'app',
  template: require('./app.pug'),
})
export class App {

  param: string = "world";

  hello = "hello";

    constructor(translate: TranslateService) {

      translate.setTranslation('en',En);
      translate.setTranslation('cn',Cn);
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('cn');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('cn');
    }

  customers: MyApp.Customer[];
  products: MyApp.Product[];
  invoices: MyApp.Invoice[];
  // items: MyApp.InvoiceItem[];

}
