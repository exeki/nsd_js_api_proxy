import JsApiProxy from "../JsApiProxy";
import RequestDto from "../model/MakeRequestDto";
import RestCallOptions from "../model/RestCallOptions";

export default class Requests {

    private jsApiProxy: JsApiProxy

    constructor(jsApiProxy: JsApiProxy) {
        this.jsApiProxy = jsApiProxy
    }

    private async devRestCall(restOfTheUrl: string, options: RestCallOptions): Promise<any> {
        const url = new URL(this.jsApiProxy.getAppRestBaseUrl() + "/" + restOfTheUrl)
        url.searchParams.append("accessKey", this.jsApiProxy.devConfig.accessKey)
        //url.searchParams.append("devMode", "true")
        //if (typeof options.body != 'string') options.body = JSON.stringify(options.body)
        const response = await fetch(
            url.toString(),
            {
                method: options.method,
                headers: options.headers,
                body: options.body,
                mode: this.jsApiProxy.devConfig.devFetchMode
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

    async make(options: RequestDto): Promise<any> {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.requests.make(${options})`)
        if (!this.jsApiProxy.isDevMode()) return jsApi.requests.make(options)
        else return await this.devRestCall(options.url, {
            method: options.method,
            responseType: options.responseType,
            headers: options.headers,
            body: options.body
        })
    }

    async json(options: RequestDto): Promise<object> {
        this.jsApiProxy.logger.methodExecuteLog(`jsApi.requests.json(${options})`)
        if (!this.jsApiProxy.isDevMode()) return jsApi.requests.make(options)
        else return await this.devRestCall(options.url, {
            method: options.method,
            responseType: options.responseType,
            headers: options.headers,
            body: options.body
        })
    }
}
