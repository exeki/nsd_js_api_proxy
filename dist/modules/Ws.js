"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ws {
    constructor(jsApiProxy) {
        this.jsApiProxy = jsApiProxy;
    }
    subscribe(destination, callback) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.ws.subscribe(${destination}, callbackFunction)`);
        if (this.jsApiProxy.isDevMode())
            throw new Error("Функция jsApi.ws.subscribe() не реализована в dev режиме");
        else
            jsApi.ws.subscribe(destination, callback);
    }
    unsubscribe(destination) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.ws.unsubscribe(${destination})`);
        if (this.jsApiProxy.isDevMode())
            throw new Error("Функция jsApi.ws.unsubscribe() не реализована в dev режиме");
        else
            jsApi.ws.unsubscribe(destination);
    }
    connect(callback) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.ws.connect(callbackFunction)`);
        if (this.jsApiProxy.isDevMode())
            throw new Error("Функция jsApi.ws.connect() не реализована в dev режиме");
        else
            jsApi.ws.connect(callback);
    }
    disconnect() {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.ws.disconnect()`);
        if (this.jsApiProxy.isDevMode())
            throw new Error("Функция jsApi.ws.disconnect() не реализована в dev режиме");
        else
            jsApi.ws.disconnect();
    }
    send(destination, message) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.ws.send(${destination}, ${message})`);
        if (this.jsApiProxy.isDevMode())
            throw new Error("Функция jsApi.ws.send() не реализована в dev режиме");
        else
            jsApi.ws.send(destination, message);
    }
}
exports.default = Ws;
