import JsApiProxy from "../JsApiProxy";
export default class Events {
    private jsApiProxy;
    constructor(jsApiProxy: JsApiProxy);
    addFieldChangeListener(attrCode: string, callback: Function): void;
    onFullscreenDisabled(callback: Function): void;
    onFullscreenEnabled(callback: Function): void;
    onContentHide(callback: Function): void;
    onContentShow(callback: Function): void;
}
//# sourceMappingURL=Events.d.ts.map