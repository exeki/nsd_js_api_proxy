"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    doMessage(message) {
        const bold = '\x1b[1m';
        const reset = '\x1b[0m';
        return `${bold}[${this.PREFIX}]${reset} ${message}`;
    }
    infoLog(message) {
        if (this.jsApiProxy.isDevMode())
            console.log(this.doMessage(message));
    }
    message(message) {
        if (this.jsApiProxy.isDevMode())
            alert(this.PREFIX + '\n' + message);
    }
    methodExecuteLog(message) {
        if (this.enableMethodExecuteLogging)
            this.infoLog(`Вызван метод: ${message}`);
    }
    methodExecuteMessage(message) {
        if (this.enableMethodExecuteMessaging)
            this.message(`Вызван метод: ${message}`);
    }
    constructor(jsApiProxy) {
        this.PREFIX = "JS_API_PROXY";
        this.enableMethodExecuteLogging = false;
        this.enableMethodExecuteMessaging = true;
        this.jsApiProxy = jsApiProxy;
    }
}
exports.default = Logger;
