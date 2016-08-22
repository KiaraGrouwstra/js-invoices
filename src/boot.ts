/// <reference path='../typings.d.ts'/>

require('normalize.css/normalize');
import 'angular2/bundles/angular2-polyfills.js';

// JIT
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);
