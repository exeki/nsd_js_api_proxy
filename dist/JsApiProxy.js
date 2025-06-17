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
const Logger_1 = __importDefault(require("./Logger"));
const Commands_1 = __importDefault(require("./modules/Commands"));
const Configuration_1 = __importDefault(require("./modules/Configuration"));
const Contents_1 = __importDefault(require("./modules/Contents"));
const Events_1 = __importDefault(require("./modules/Events"));
const Requests_1 = __importDefault(require("./modules/Requests"));
const Urls_1 = __importDefault(require("./modules/Urls"));
const Ws_1 = __importDefault(require("./modules/Ws"));
const Forms_1 = __importDefault(require("./modules/Forms"));
class JsApiProxy {
    constructor(devConfig) {
        this.devMode = true;
        this.apiFound = false;
        this.logger = new Logger_1.default(this);
        this.devConfig = devConfig;
        this.setup();
        this.logger = new Logger_1.default(this);
        this.contents = new Contents_1.default(this);
        this.commands = new Commands_1.default(this);
        this.configuration = new Configuration_1.default(this);
        this.events = new Events_1.default(this);
        this.requests = new Requests_1.default(this);
        this.urls = new Urls_1.default(this);
        this.ws = new Ws_1.default(this);
        this.forms = new Forms_1.default(this);
        this.setMethodLogging(this.devMode);
    }
    static getInstance(devConfig) {
        if (this.instance == null)
            this.instance = new JsApiProxy(devConfig);
        return this.instance;
    }
    setMethodLogging(bool) {
        this.logger.enableMethodExecuteLogging = bool;
    }
    isDevMode() {
        return this.devMode;
    }
    isApiFound() {
        return this.apiFound;
    }
    isDevConfigFound() {
        return this.devConfig != null;
    }
    getDevConfig() {
        return this.devConfig;
    }
    setDevConfig(config) {
        this.devConfig = config;
    }
    setup() {
        var _a;
        const doBold = (str) => {
            const bold = '\x1b[1m';
            const reset = '\x1b[0m';
            return bold + str + reset;
        };
        const apiError = this.loadJsApi();
        let log = `\n${doBold("devMode")}: ${this.devMode}\n`;
        if (this.devMode) {
            log += `${doBold("devConfigFound")}: ${this.devConfig != null}`;
            if (this.devConfig != null)
                log += `\n${doBold("host")}: ${(_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.host}\n`;
        }
        else {
            log += `${doBold("apiFound")}: ` + this.apiFound;
            if (!this.apiFound)
                log += `, cause: ${apiError}\n`;
        }
        this.logger.infoLog(log);
    }
    loadJsApi() {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.parent.injectJsApi(window.parent, window);
            this.devMode = false;
            this.apiFound = true;
            return null;
        }
        catch (error) {
            this.devMode = true;
            this.apiFound = false;
            return error;
        }
    }
    isOnObjectCard() {
        var _a, _b;
        this.logger.methodExecuteLog("jsApi.isOnObjectCard()");
        if (this.devMode) {
            if (((_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.isOnObjectCard) == undefined)
                throw new Error("isOnObjectCard is undefined");
            else
                return (_b = this.devConfig) === null || _b === void 0 ? void 0 : _b.isOnObjectCard;
        }
        else
            return jsApi.isOnObjectCard();
    }
    isAddForm() {
        var _a, _b;
        this.logger.methodExecuteLog("jsApi.isAddForm()");
        if (this.devMode) {
            if (((_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.isAddForm) == undefined)
                throw new Error("isAddForm is undefined");
            else
                return (_b = this.devConfig) === null || _b === void 0 ? void 0 : _b.isAddForm;
        }
        else
            return jsApi.isAddForm();
    }
    isEditForm() {
        var _a, _b;
        this.logger.methodExecuteLog("jsApi.isEditForm()");
        if (this.devMode) {
            if (((_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.isEditForm) == undefined)
                throw new Error("isEditForm is undefined");
            else
                return (_b = this.devConfig) === null || _b === void 0 ? void 0 : _b.isEditForm;
        }
        else
            return jsApi.isEditForm();
    }
    findApplicationCode() {
        var _a, _b;
        this.logger.methodExecuteLog("jsApi.findApplicationCode()");
        if (this.devMode) {
            if (((_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.appCode) == undefined)
                throw new Error("appCode is undefined");
            else
                return (_b = this.devConfig) === null || _b === void 0 ? void 0 : _b.appCode;
        }
        else
            return jsApi.findApplicationCode();
    }
    findContentCode() {
        var _a;
        this.logger.methodExecuteLog("jsApi.findApplicationCode()");
        if (this.devMode) {
            if (((_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.contentCode) == undefined)
                throw new Error("contentCode is undefined");
            else
                return this.devConfig.contentCode;
        }
        else
            return jsApi.findContentCode();
    }
    extractSubjectUuid() {
        var _a, _b;
        this.logger.methodExecuteLog("jsApi.extractSubjectUuid()");
        if (this.devMode) {
            if (((_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.subjectUuid) == undefined)
                throw new Error("subjectUuid is undefined");
            else
                return (_b = this.devConfig) === null || _b === void 0 ? void 0 : _b.subjectUuid;
        }
        else
            return jsApi.extractSubjectUuid();
    }
    registerAttributeToModification(attributeCode, resultCallback) {
        this.logger.methodExecuteLog(`jsApi.registerAttributeToModification(${attributeCode}, resultCallback)`);
        if (!this.devMode)
            jsApi.registerAttributeToModification(attributeCode, resultCallback);
    }
    getCurrentUser() {
        var _a, _b;
        this.logger.methodExecuteLog(`jsApi.getCurrentUser()`);
        if (this.devMode) {
            if (((_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.currentUserUuid) == undefined)
                throw new Error("currentUserUuid is undefined");
            else
                return { "uuid": (_b = this.devConfig) === null || _b === void 0 ? void 0 : _b.currentUserUuid };
        }
        else
            return jsApi.getCurrentUser();
    }
    getCurrentLocale() {
        var _a;
        this.logger.methodExecuteLog(`jsApi.getCurrentLocale()`);
        if (this.devMode) {
            if (((_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.currentLocale) == undefined)
                throw new Error("currentLocale is undefined");
            else
                return this.devConfig.currentLocale;
        }
        else
            return jsApi.getCurrentLocale();
    }
    getAppBaseUrl() {
        var _a, _b;
        this.logger.methodExecuteLog(`jsApi.getAppBaseUrl()`);
        if (this.devMode) {
            if (((_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.host) == undefined)
                throw new Error("host is undefined");
            if (((_b = this.devConfig) === null || _b === void 0 ? void 0 : _b.scheme) == undefined)
                throw new Error("scheme is undefined");
            return this.devConfig.scheme + "://" + this.devConfig.host + "/sd/";
        }
        else
            return jsApi.getAppBaseUrl();
    }
    getAppRestBaseUrl() {
        this.logger.methodExecuteLog(`jsApi.getAppRestBaseUrl()`);
        if (this.devMode) {
            return this.devConfig.scheme + "://" + this.devConfig.host + "/sd/" + "/" + JsApiProxy.restPath;
        }
        else
            return jsApi.getAppRestBaseUrl();
    }
    getViewMode() {
        var _a;
        this.logger.methodExecuteLog(`jsApi.getViewMode()`);
        if (this.devMode) {
            if (((_a = this.devConfig) === null || _a === void 0 ? void 0 : _a.viewMode) == undefined)
                throw new Error("viewMode is undefined");
            else
                return this.devConfig.viewMode;
        }
        else
            return jsApi.getViewMode();
    }
    devRestCall(restOfTheUrl, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = new URL(`${this.devConfig.scheme}://${this.devConfig.host}/sd/${JsApiProxy.restPath}/${restOfTheUrl}`);
            url.searchParams.append("accessKey", this.devConfig.accessKey);
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
    restCall(restOfTheUrl, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.methodExecuteLog(`jsApi.restCall(${restOfTheUrl}, ${options})`);
            if (this.devMode) {
                return yield this.devRestCall(restOfTheUrl, options);
            }
            else {
                //if (typeof options.body !== 'string') options.body = JSON.stringify(options.body)
                return jsApi.restCall(restOfTheUrl, options);
            }
        });
    }
    //TODO протестировать, а точно ли тут нужно присваивать responseType
    restCallAsJson(restOfTheUrl, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.methodExecuteLog(`jsApi.restCallAsJson(${restOfTheUrl}, ${options})`);
            if (this.devMode) {
                options.responseType = "json";
                return yield this.devRestCall(restOfTheUrl, options);
            }
            else
                return jsApi.restCallAsJson(restOfTheUrl, options);
        });
    }
    //TODO протестировать, хз как будут работать аргументы
    restCallModule(moduleCode, functionName, args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.methodExecuteLog(`jsApi.restCallModule(${moduleCode}, ${functionName}, ${args})`);
            if (this.devMode) {
                const restOfTheUrl = `exec?func=${moduleCode}&params=${args}&raw=true`;
                return this.devRestCall(restOfTheUrl, { method: "GET" });
            }
            else
                return jsApi.restCallModule(moduleCode, functionName, args);
        });
    }
}
JsApiProxy.uiBasePath = "operator";
JsApiProxy.restPath = "services/rest";
JsApiProxy.configFileName = "nsd_js_dev_config.json";
// eslint-disable-next-line
exports.default = JsApiProxy;
