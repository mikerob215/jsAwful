import {Component} from "./IComponent";
export class Module {
    private _components;


    get components() {
        return this._components;
    }

    set components(value) {
        this._components = value.map(component => new component());
    }
}