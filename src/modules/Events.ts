import JsApiProxy from "../JsApiProxy";

export default class Events {
    private jsApiProxy: JsApiProxy

    constructor(jsApiProxy: JsApiProxy) {
        this.jsApiProxy = jsApiProxy
    }

    addFieldChangeListener(attrCode : string, callback : Function) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.events.addFieldChangeListener(${attrCode}, callbackFunction)`)
        if (!this.jsApiProxy.isDevMode()) jsApi.events.addFieldChangeListener(attrCode, callback)
    }

    onFullscreenDisabled(callback : Function) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.events.onFullscreenDisabled(callbackFunction)`)
        if (!this.jsApiProxy.isDevMode()) jsApi.events.onFullscreenDisabled(callback)
    }

    onFullscreenEnabled(callback : Function) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.events.onFullscreenEnabled(callbackFunction)`)
        if (!this.jsApiProxy.isDevMode()) jsApi.events.onFullscreenEnabled(callback)
    }

    onContentHide(callback : Function) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.events.onContentHide(callbackFunction)`)
        if (!this.jsApiProxy.isDevMode()) jsApi.events.onContentHide(callback)
    }

    onContentShow(callback : Function) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.events.onContentShow(callbackFunction)`)
        if (!this.jsApiProxy.isDevMode()) jsApi.events.onContentShow(callback)
    }
}
