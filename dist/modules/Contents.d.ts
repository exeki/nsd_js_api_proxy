import JsApiProxy from "../JsApiProxy";
export default class Contents {
    private jsApiProxy;
    private devHeight;
    constructor(jsApiProxy: JsApiProxy);
    getParameters(): Promise<Record<string, any>>;
    getInitialHeight(): number;
    setHeight(height: number): Promise<{}>;
    getHeight(): number;
}
//# sourceMappingURL=Contents.d.ts.map