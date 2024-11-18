import JsApiProxy from "../JsApiProxy";
import RestCallOptions from "../model/RestCallOptions";

export default class Configuration {
    private jsApiProxy: JsApiProxy

    constructor(jsApiProxy: JsApiProxy) {
        this.jsApiProxy = jsApiProxy
    }

    private async devRestCall(restOfTheUrl: string, options: RestCallOptions): Promise<any> {
        const url = new URL(this.jsApiProxy.getAppRestBaseUrl() + "/" + restOfTheUrl)
        url.searchParams.append("accessKey", this.jsApiProxy.devConfig.accessKey)
        url.searchParams.append("devMode", "true")
        let body: string
        if (typeof options.body === 'string') body = options.body
        else body = JSON.stringify(options.body)
        const response = await fetch(
            url.toString(),
            {
                method: options.method,
                headers: options.headers,
                body: body,
                mode : this.jsApiProxy.devConfig.devFetchMode
            }
        )
        switch (options.responseType) {
            case "text":
                return response.text()
            case "json":
                return response.json()
            case "arraybuffer":
                return response.arrayBuffer()
            case "blob":
                return response.blob()
            default:
                return response.text()
        }
    }

    async byContentCode(moduleCode: string, args: any[]): Promise<any> {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.configuration.byContentCode(${moduleCode}, ${args})`)
        const restOfTheUrl = `exec?func=${moduleCode}.${this.jsApiProxy.findApplicationCode()}&params=${args}&raw=true`
        return await this.devRestCall(restOfTheUrl, {method: "GET"})
    }

    async byDefault(moduleCode: string, args: any[]): Promise<any> {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.configuration.byDefault(${moduleCode}, ${args})`)
        const restOfTheUrl = `exec?func=${moduleCode}.getConfiguration&params=${args}&raw=true`
        return await this.devRestCall(restOfTheUrl, {method: "GET"})
    }

}
