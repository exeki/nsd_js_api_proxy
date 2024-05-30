import JsApiProxy from "../JsApiProxy";

export default class Urls {
    private jsApiProxy: JsApiProxy

    constructor(jsApiProxy: JsApiProxy) {
        this.jsApiProxy = jsApiProxy
    }

    base(): string {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.urls.base()`)
        if (this.jsApiProxy.isDevMode()) return this.jsApiProxy.getAppBaseUrl()
        else return jsApi.urls.base()
    }

    objectCard(uuid: string): string {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.urls.objectCard(${uuid})`)
        if (this.jsApiProxy.isDevMode()) return `${this.jsApiProxy.getAppBaseUrl()}operator/#uuid:${uuid}`
        else return jsApi.urls.objectCard(uuid)
    }

    objectAddForm(fqn: string): string {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.urls.objectAddForm(${fqn})`)
        if (this.jsApiProxy.isDevMode()) return `${this.jsApiProxy.getAppBaseUrl()}operator/#add:${fqn}`
        else return jsApi.urls.objectAddForm(fqn)
    }

    objectEditForm(uuid: string): string {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.urls.objectEditForm(${uuid})`)
        if (this.jsApiProxy.isDevMode()) return `${this.jsApiProxy.getAppBaseUrl()}operator/#edit:${uuid}`
        else return jsApi.urls.objectEditForm(uuid)
    }

}
