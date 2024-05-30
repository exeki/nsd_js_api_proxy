import JsApiProxy from "../JsApiProxy";

export default class Contents {

    private jsApiProxy: JsApiProxy

    private devHeight: number = 0

    constructor(jsApiProxy: JsApiProxy) {
        this.jsApiProxy = jsApiProxy
        if (this.jsApiProxy.devConfig.appInitialHeight != undefined) {
            this.devHeight = this.jsApiProxy.devConfig.appInitialHeight
        }
    }

    async getParameters(): Promise<Record<string, any>> {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.commands.getParameters()`)
        if (!this.jsApiProxy.isDevMode()) return await jsApi.contents.getParameters()
        else {
            if (this.jsApiProxy.devConfig?.currentContentParameters == undefined) throw new Error("currentContentParameters is undefined")
            return this.jsApiProxy.devConfig.currentContentParameters
        }
    }

    getInitialHeight(): number {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.commands.getInitialHeight()`)
        if (!this.jsApiProxy.isDevMode()) return jsApi.contents.getInitialHeight()
        else {
            if (this.jsApiProxy.devConfig.appInitialHeight == undefined) throw new Error("appInitialHeight is undefined")
            return this.jsApiProxy.devConfig.appInitialHeight
        }
    }

    async setHeight(height: number): Promise<{}> {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.commands.setHeight(${height})`)
        if (!this.jsApiProxy.isDevMode()) return await jsApi.contents.setHeight(height)
        else {
            this.devHeight = height
            return {}
        }
    }

    getHeight(): number {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.commands.getHeight()`)
        if (!this.jsApiProxy.isDevMode()) return jsApi.contents.getHeight()
        else return this.devHeight
    }
}
