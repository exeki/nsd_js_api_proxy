import JsApiProxy from "../JsApiProxy";
export default class Forms {
    private jsApiProxy;
    constructor(jsApiProxy: JsApiProxy);
    getValues(): Promise<Record<string, any>>;
    changeResponsible(uuid: string): Promise<Record<string, any> | null | undefined>;
}
//# sourceMappingURL=Forms.d.ts.map