import JsApiProxy from "./JsApiProxy";
declare class Logger {
    private PREFIX;
    private jsApiProxy;
    enableMethodExecuteLogging: boolean;
    enableMethodExecuteMessaging: boolean;
    private doMessage;
    infoLog(message: string): void;
    message(message: string): void;
    methodExecuteLog(message: string): void;
    methodExecuteMessage(message: string): void;
    constructor(jsApiProxy: JsApiProxy);
}
export default Logger;
//# sourceMappingURL=Logger.d.ts.map