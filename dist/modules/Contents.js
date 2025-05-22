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
class Contents {
    constructor(jsApiProxy) {
        this.devHeight = 0;
        this.jsApiProxy = jsApiProxy;
        if (this.jsApiProxy.devConfig.appInitialHeight != undefined) {
            this.devHeight = this.jsApiProxy.devConfig.appInitialHeight;
        }
    }
    getParameters() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.jsApiProxy.logger.methodExecuteLog(`jsApi.commands.getParameters()`);
            if (!this.jsApiProxy.isDevMode())
                return yield jsApi.contents.getParameters();
            else {
                if (((_a = this.jsApiProxy.devConfig) === null || _a === void 0 ? void 0 : _a.currentContentParameters) == undefined)
                    throw new Error("currentContentParameters is undefined");
                return this.jsApiProxy.devConfig.currentContentParameters;
            }
        });
    }
    getInitialHeight() {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.commands.getInitialHeight()`);
        if (!this.jsApiProxy.isDevMode())
            return jsApi.contents.getInitialHeight();
        else {
            if (this.jsApiProxy.devConfig.appInitialHeight == undefined)
                throw new Error("appInitialHeight is undefined");
            return this.jsApiProxy.devConfig.appInitialHeight;
        }
    }
    setHeight(height) {
        return __awaiter(this, void 0, void 0, function* () {
            this.jsApiProxy.logger.methodExecuteLog(`jsApi.commands.setHeight(${height})`);
            if (!this.jsApiProxy.isDevMode())
                return yield jsApi.contents.setHeight(height);
            else {
                this.devHeight = height;
                return {};
            }
        });
    }
    getHeight() {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.commands.getHeight()`);
        if (!this.jsApiProxy.isDevMode())
            return jsApi.contents.getHeight();
        else
            return this.devHeight;
    }
}
exports.default = Contents;
