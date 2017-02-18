import {Component} from "./IComponent";
export class Module {
    private _components: Array<Component>;
    private _directives;

    get directives() {
        return this._directives;
    }

    set directives(value) {
        this._directives = value;
    }

    get components() {
        return this._components;
    }

    set components(value: Array<any>) {
        this._components = value.map(component => new component());
    }
}