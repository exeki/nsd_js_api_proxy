"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Events {
    constructor(jsApiProxy) {
        this.jsApiProxy = jsApiProxy;
    }
    addFieldChangeListener(attrCode, callback) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.events.addFieldChangeListener(${attrCode}, callbackFunction)`);
        if (!this.jsApiProxy.isDevMode())
            jsApi.events.addFieldChangeListener(attrCode, callback);
    }
    onFullscreenDisabled(callback) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.events.onFullscreenDisabled(callbackFunction)`);
        if (!this.jsApiProxy.isDevMode())
            jsApi.events.onFullscreenDisabled(callback);
    }
    onFullscreenEnabled(callback) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.events.onFullscreenEnabled(callbackFunction)`);
        if (!this.jsApiProxy.isDevMode())
            jsApi.events.onFullscreenEnabled(callback);
    }
    onContentHide(callback) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.events.onContentHide(callbackFunction)`);
        if (!this.jsApiProxy.isDevMode())
            jsApi.events.onContentHide(callback);
    }
    onContentShow(callback) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.events.onContentShow(callbackFunction)`);
        if (!this.jsApiProxy.isDevMode())
            jsApi.events.onContentShow(callback);
    }
}
exports.default = Events;
