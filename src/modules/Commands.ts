import JsApiProxy from "../JsApiProxy";

export default class Commands {

    private jsApiProxy: JsApiProxy

    constructor(jsApiProxy: JsApiProxy) {
        this.jsApiProxy = jsApiProxy
    }

    async selectObjectDialog(classFqn: string, presentAttributesGroupCode: string): Promise<string | null> {
        const methodName = `jsApi.commands.selectObjectDialog(${classFqn}, ${presentAttributesGroupCode})`
        this.jsApiProxy.logger.methodExecuteLog(methodName)
        if (!this.jsApiProxy.isDevMode()) return await jsApi.commands.selectObjectDialog(classFqn, presentAttributesGroupCode)
        else {
            this.jsApiProxy.logger.methodExecuteMessage(methodName)
            if (this.jsApiProxy.devConfig?.objectDialogSelectionResult == undefined) throw new Error("objectDialogSelectionResult is undefined")
            const records : Record<string, string | null> = this.jsApiProxy.devConfig.objectDialogSelectionResult
            const result : string | null | undefined = records[(classFqn + presentAttributesGroupCode)]
            if(typeof result == undefined) return null
            else return result
        }
    }

    changeState(uuid: string, state: string[]) {
        const methodName = `jsApi.commands.changeState(${uuid}, ${state})`
        this.jsApiProxy.logger.methodExecuteLog(methodName)
        if (!this.jsApiProxy.isDevMode()) jsApi.commands.changeState(uuid, state)
        else this.jsApiProxy.logger.methodExecuteMessage(methodName)
    }

    editObject(uuid: string) {
        const methodName = `jsApi.commands.editObject(${uuid})`
        this.jsApiProxy.logger.methodExecuteLog(methodName)
        if (!this.jsApiProxy.isDevMode()) jsApi.commands.editObject(uuid)
        else this.jsApiProxy.logger.methodExecuteMessage(methodName)
    }

    quickAddObject(classFqn: string, formCode: string, properties: Map<string, any>, callback: Function) {
        const methodName = `jsApi.commands.quickAddObject(${classFqn}, ${formCode}, ${properties}, callbackFunction)`
        this.jsApiProxy.logger.methodExecuteLog(methodName)
        if (!this.jsApiProxy.isDevMode()) jsApi.commands.quickAddObject(classFqn, classFqn, properties, callback)
        else this.jsApiProxy.logger.methodExecuteMessage(methodName)
    }

    quickEditObject(uuid: string, formCode: string, properties: Map<string, any>, callback: Function) {
        const methodName = `jsApi.commands.quickEditObject(${uuid}, ${formCode}, ${properties}, callbackFunction)`
        this.jsApiProxy.logger.methodExecuteLog(methodName)
        if (!this.jsApiProxy.isDevMode()) jsApi.commands.quickEditObject(uuid, formCode, properties, callback)
        else this.jsApiProxy.logger.methodExecuteMessage(methodName)
    }
}

