import JsApiProxy from "../JsApiProxy";
export default class Urls {
    private jsApiProxy;
    constructor(jsApiProxy: JsApiProxy);
    base(): string;
    objectCard(uuid: string): string;
    objectAddForm(fqn: string): string;
    objectEditForm(uuid: string): string;
}
//# sourceMappingURL=Urls.d.ts.map