import JsApiProxy from "../JsApiProxy";

export default class Forms {

    private jsApiProxy: JsApiProxy

    constructor(jsApiProxy: JsApiProxy) {
        this.jsApiProxy = jsApiProxy
    }

    async getValues() : Promise<Record<string, any>> {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.forms.getValues()`)
        if (!this.jsApiProxy.isDevMode()) return await jsApi.forms.getValues()
        else {
            if (this.jsApiProxy.devConfig?.formValues == undefined) throw new Error("formValues is undefined")
            return this.jsApiProxy.devConfig.formValues
        }
    }

    async changeResponsible() : Promise<Record<string, any> | null | undefined> {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.forms.getValues()`)
        if (!this.jsApiProxy.isDevMode()) return await jsApi.forms.getValues()
        else {
            if (this.jsApiProxy.devConfig?.formValues == undefined) throw new Error("formValues is undefined")
            return this.jsApiProxy.devConfig.formValues
        }
    }

}
