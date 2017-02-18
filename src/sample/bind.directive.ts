import {IDirective} from "../core/IDirective";
export default class BindDirective implements IDirective {
    attrName = 'bind';

    constructor(el: HTMLInputElement) {
        console.log(el)
    }
}