import JsApiProxy from "../JsApiProxy";
export default class Configuration {
    private jsApiProxy;
    constructor(jsApiProxy: JsApiProxy);
    private devRestCall;
    byContentCode(moduleCode: string, args: any[]): Promise<any>;
    byDefault(moduleCode: string, args: any[]): Promise<any>;
}
//# sourceMappingURL=Configuration.d.ts.map