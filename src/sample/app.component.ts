import {Component} from "../core/IComponent";
export class AppComponent implements Component {
    constructor() {

    }
    public selector =  'app';
    public template = `gigigigg
    <br>
    <sub test="'hi'"></sub>
    `;
}