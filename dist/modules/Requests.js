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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsApiProxy_1 = __importDefault(require("../JsApiProxy"));
class Requests {
    constructor(jsApiProxy) {
        this.jsApiProxy = jsApiProxy;
    }
    devRestCall(restOfTheUrl, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(`${this.jsApiProxy.devConfig.scheme}://${this.jsApiProxy.devConfig.host}/sd/${JsApiProxy_1.default.restPath}/${restOfTheUrl}`);
            url.searchParams.append("accessKey", this.jsApiProxy.devConfig.accessKey);
            url.searchParams.append("devMode", "true");
            //if (typeof options.body != 'string') options.body = JSON.stringify(options.body)
            try {
                const response = yield fetch(url.toString(), {
                    method: options.method,
                    headers: options.headers,
                    body: options.body
                });
                if (response.ok) {
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
                }
                else
                    return Promise.reject(response);
            }
            catch (e) {
                return Promise.reject(e);
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
