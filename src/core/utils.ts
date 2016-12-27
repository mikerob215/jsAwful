import {Component} from "./IComponent";
import {Module} from "./Module";
export namespace utils {
    let components: Component[];

    /**
     * Kicks off the application by compiling
     * @name bootstrap
     * @param rootModule
     */
    export function bootstrap(rootModule: Module) {
        components = rootModule.components;
        const rootComponent = rootModule.components.find(comp => comp.selector === 'app');
        document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            compile(rootComponent, document.body)
        }, 1000);
        });
    }

    /**
     *
     * @param component
     * @param parent
     */
    export function compile(component: Component, parent: Element) {
        const el: Element = parent.getElementsByTagName(component.selector)[0];
        el.innerHTML = component.template;
        if (component.properties) {
            component.properties.forEach(prop => {
                const prop_value = eval(el.getAttribute(prop));
                component[`${prop}`] = prop_value;
                interpolateString(component).forEach(part => el.innerHTML.replace(`${part}`, prop_value));
            });
        }
        if (el.hasChildNodes()) {
            collectComponents(el);
        }
    }

    /**
     * @name collectComponents
     * @param parent
     */
    export function collectComponents(parent: Element) {
        components.forEach(component => {
            const tag = parent.getElementsByTagName(component.selector);
            if (tag.length > 0) {
                compile(component, parent)
            }
        })
    }

    /**
     * Returns a template with string interpolated correctly
     * @name interpolateString
     * @param text
     * @returns {string}
     */
    export function interpolateString(component) {
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
        console.log(parts)
            return parts;
    }
}