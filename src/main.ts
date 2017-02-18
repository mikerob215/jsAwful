import 'core-js/es6/array';
import {core} from "./core/utils";
import {Module} from "./core/Module";
import {AppComponent} from "./sample/app.component";
import {SubComponent} from "./sample/sub.component";

let RootModule = new Module;

RootModule.components = [AppComponent, SubComponent];

core.bootstrap(RootModule);
