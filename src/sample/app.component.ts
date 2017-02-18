import {Component} from "../core/IComponent";

export class AppComponent implements Component {
    public selector =  'app';
    properties = ['test'];
    public test = "something man";
    public template = `
    <br>
    {{test}}
    <sub test="'hey'"></sub>
    <sub test="'wtf'"></sub>
    `;

}