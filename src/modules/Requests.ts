import JsApiProxy from "../JsApiProxy";
import RequestDto from "../model/requests/MakeDto";
import RestCallOptions from "../model/RestCallOptions";
import ResponseType from "../model/ResponseType";

export default class Requests {

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
            }
        )
        switch (options.responseType) {
            case ResponseType.TEXT:
                return response.text()
            case ResponseType.JSON:
                return response.json()
            case ResponseType.ARRAYBUFFER:
                return response.arrayBuffer()
            case ResponseType.BLOB:
                return response.blob()
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
