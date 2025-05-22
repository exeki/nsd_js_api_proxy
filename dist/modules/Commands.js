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
class Commands {
    constructor(jsApiProxy) {
        this.jsApiProxy = jsApiProxy;
    }
    selectObjectDialog(classFqn, presentAttributesGroupCode) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const methodName = `jsApi.commands.selectObjectDialog(${classFqn}, ${presentAttributesGroupCode})`;
            this.jsApiProxy.logger.methodExecuteLog(methodName);
            if (!this.jsApiProxy.isDevMode())
                return yield jsApi.commands.selectObjectDialog(classFqn, presentAttributesGroupCode);
            else {
                this.jsApiProxy.logger.methodExecuteMessage(methodName);
                if (((_a = this.jsApiProxy.devConfig) === null || _a === void 0 ? void 0 : _a.objectDialogSelectionResult) == undefined)
                    throw new Error("objectDialogSelectionResult is undefined");
                const records = this.jsApiProxy.devConfig.objectDialogSelectionResult;
                const result = records[(classFqn + presentAttributesGroupCode)];
                if (typeof result == undefined)
                    return null;
                else
                    return result;
            }
        });
    }
    changeState(uuid, state) {
        const methodName = `jsApi.commands.changeState(${uuid}, ${state})`;
        this.jsApiProxy.logger.methodExecuteLog(methodName);
        if (!this.jsApiProxy.isDevMode())
            jsApi.commands.changeState(uuid, state);
        else
            this.jsApiProxy.logger.methodExecuteMessage(methodName);
    }
    editObject(uuid) {
        const methodName = `jsApi.commands.editObject(${uuid})`;
        this.jsApiProxy.logger.methodExecuteLog(methodName);
        if (!this.jsApiProxy.isDevMode())
            jsApi.commands.editObject(uuid);
        else
            this.jsApiProxy.logger.methodExecuteMessage(methodName);
    }
    quickAddObject(classFqn, formCode, properties, callback) {
        const methodName = `jsApi.commands.quickAddObject(${classFqn}, ${formCode}, properties, callbackFunction)`;
        this.jsApiProxy.logger.methodExecuteLog(methodName);
        if (!this.jsApiProxy.isDevMode())
            jsApi.commands.quickAddObject(classFqn, classFqn, properties, callback);
        else
            this.jsApiProxy.logger.methodExecuteMessage(methodName);
    }
    quickEditObject(uuid, formCode, properties, callback) {
        const methodName = `jsApi.commands.quickEditObject(${uuid}, ${formCode}, properties, callbackFunction)`;
        this.jsApiProxy.logger.methodExecuteLog(methodName);
        if (!this.jsApiProxy.isDevMode())
            jsApi.commands.quickEditObject(uuid, formCode, properties, callback);
        else
            this.jsApiProxy.logger.methodExecuteMessage(methodName);
    }
}
exports.default = Commands;
