import JsApiProxy from "../JsApiProxy";
export default class Ws {
    private jsApiProxy;
    constructor(jsApiProxy: JsApiProxy);
    subscribe(destination: string, callback: Function): void;
    unsubscribe(destination: string): void;
    connect(callback: Function): void;
    disconnect(): void;
    send(destination: string, message: string): void;
}
//# sourceMappingURL=Ws.d.ts.map