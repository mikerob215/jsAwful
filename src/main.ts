import 'core-js';
import {utils} from "./core/utils";
import {Module} from "./core/Module";
import {AppComponent} from "./sample/app.component";
import {Subcomponent} from "./sample/sub.component";

let RootModule = new Module;

RootModule.components = [AppComponent, Subcomponent];

utils.bootstrap(RootModule);
