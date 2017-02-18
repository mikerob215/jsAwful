import {Component} from "./IComponent";
import {Module} from "./Module";
import {IDirective} from "./IDirective";
export namespace core {
    let components: Component[];

    /**
     * @name checkValidSetup
     * @description Ensures the app contains components and a root component identified as <app></app>
     * @param rootModule
     * @return {Component}
     */
    export function checkValidSetup(rootModule: Module) {
        if (components.length <= 0) {
            throw new Error("No components registered");
        }
        const rootComponent = rootModule.components.find(comp => comp.selector === 'app');
        if (!rootComponent) {
            throw new Error("No root component registered, must contain a component with selector: 'app'")
        }
        return rootComponent;
    }

    /**
     * Kicks off the application by compiling
     * @name bootstrap
     * @param rootModule
     */
    export function bootstrap(rootModule: Module): void {
        components = rootModule.components;
        const rootComponent = checkValidSetup(rootModule);
        document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            compile(rootComponent, document.body)
        }, 0);
        });
    }
    export function collectDirectives(attrs: Array<Element>) {
        
    }

    export function compileDirectives(directives: Array<IDirective>) {
        directives.forEach(directive => directive.link());
    }

    /**
     *
     * @param component
     * @param parent
     */
    export function compile(component: Component, parent: HTMLElement) {
        const el = parent.getElementsByTagName(component.selector);
        for (let i = 0; i < el.length; i++) {
            el[i].innerHTML = component.template;
            if (component.properties) {
                component.$element = el[i].parentElement;
                component.properties.forEach(prop => {
                    const prop_value = eval(el[i].getAttribute(prop));
                    if (!component[`${prop}`]) {
                        interpolateString(component).forEach(part => {
                            el[i].innerHTML = el[i].innerHTML.replace(`{{${part}}}`, prop_value)
                        })
                    }
                    if (component[`${prop}`] !== prop_value) {
                        interpolateString(component).forEach(part => {
                            el[i].innerHTML = el[i].innerHTML.replace(`{{${part}}}`, component[`${prop}`])
                        })
                    }
                })
            }
            (collectChildComponents(el[i])).forEach(component => compile(component.component, component.parent));
        }
        compileDirectives()
    }

    /**
     *
     * @name collectComponents
     * @param parent
     */
    export function collectChildComponents(parent) {
        return components.map((component) => {
            return {component, parent};
        });
    }

    /**
     * Returns a template with string interpolated correctly
     * @name interpolateString
     * @returns {string}
     * @param component
     */
    export function interpolateString(component: Component) {
        let index = 0;
        let text = component.template;
        let parts = [];
        while (index < text.length) {
            const start_index = text.indexOf('{{');
            const end_index = text.indexOf('}}');
            if (start_index !== -1 && end_index !== -1) {
                let expr = text.substring(start_index + 2, end_index);
                parts.push(expr);
            } else {
                break;
            }
            index += end_index + 2;
        }
        return parts;
    }
}