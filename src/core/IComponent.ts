export interface Component {
    selector: string;
    controller?: any;
    properties?: string[];
    template: string;
    $element?: Element;

    init?();
}

