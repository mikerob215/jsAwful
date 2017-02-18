import {Component} from "../core/IComponent";
import {core} from "../core/utils";

function ComponentOptions(constructorFn: Function) {
    constructorFn.prototype.poop = "fuuuuuck";
}
@ComponentOptions

export class SubComponent implements Component {
    public text: string;
    properties: any = ['test', 'poop'];
    template = `{{ test }} {{ test }} {{ test }}`;
    selector = 'sub';
    public $element;


    constructor() {
        setTimeout(() => {
            this['test'] = 'sdfsd';
            this['poop'] = 'string';
            core.compile(this, this.$element);
        }, 1000);
    }
}