"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Requests {
    constructor(jsApiProxy) {
        this.jsApiProxy = jsApiProxy;
    }
    devRestCall(restOfTheUrl, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(this.jsApiProxy.getAppRestBaseUrl() + "/" + restOfTheUrl);
            url.searchParams.append("accessKey", this.jsApiProxy.devConfig.accessKey);
            //url.searchParams.append("devMode", "true")
            //if (typeof options.body != 'string') options.body = JSON.stringify(options.body)
            const response = yield fetch(url.toString(), {
                method: options.method,
                headers: options.headers,
                body: options.body,
                mode: this.jsApiProxy.devConfig.devFetchMode
            });
            switch (options.responseType) {
                case "text":
                    return response.text();
                case "json":
                    return response.json();
                case "arraybuffer":
                    return response.arrayBuffer();
                case "blob":
                    return response.blob();
                default:
                    return response.text();
            }
        });
    }
    make(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.jsApiProxy.logger.methodExecuteLog(`jsApi.requests.make(${options})`);
            if (!this.jsApiProxy.isDevMode())
                return jsApi.requests.make(options);
            else
                return yield this.devRestCall(options.url, {
                    method: options.method,
                    responseType: options.responseType,
                    headers: options.headers,
                    body: options.body
                });
        });
    }
    json(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.jsApiProxy.logger.methodExecuteLog(`jsApi.requests.json(${options})`);
            if (!this.jsApiProxy.isDevMode())
                return jsApi.requests.make(options);
            else
                return yield this.devRestCall(options.url, {
                    method: options.method,
                    responseType: options.responseType,
                    headers: options.headers,
                    body: options.body
                });
        });
    }
}
exports.default = Requests;
