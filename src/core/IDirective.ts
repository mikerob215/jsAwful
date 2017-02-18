export interface IDirective {
    constructor(any: any);
    attrName: string;
    link(): void;
}