"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Urls {
    constructor(jsApiProxy) {
        this.jsApiProxy = jsApiProxy;
    }
    base() {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.urls.base()`);
        if (this.jsApiProxy.isDevMode())
            return this.jsApiProxy.getAppBaseUrl();
        else
            return jsApi.urls.base();
    }
    objectCard(uuid) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.urls.objectCard(${uuid})`);
        if (this.jsApiProxy.isDevMode())
            return `${this.jsApiProxy.getAppBaseUrl()}operator/#uuid:${uuid}`;
        else
            return jsApi.urls.objectCard(uuid);
    }
    objectAddForm(fqn) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.urls.objectAddForm(${fqn})`);
        if (this.jsApiProxy.isDevMode())
            return `${this.jsApiProxy.getAppBaseUrl()}operator/#add:${fqn}`;
        else
            return jsApi.urls.objectAddForm(fqn);
    }
    objectEditForm(uuid) {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.urls.objectEditForm(${uuid})`);
        if (this.jsApiProxy.isDevMode())
            return `${this.jsApiProxy.getAppBaseUrl()}operator/#edit:${uuid}`;
        else
            return jsApi.urls.objectEditForm(uuid);
    }
}
exports.default = Urls;
