import {Component} from "../core/IComponent";

export class Subcomponent implements Component {
    public text: string;
    properties: any = ['test'];
    template: string = '{{ test }}';
    selector: string = 'sub';

    constructor() {
        // console.log(this)
    }
}