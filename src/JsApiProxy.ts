import DevConfig from "./model/DevConfig";
import RestCallResponseType from "./model/RestCallResponseType";
import RestCallOptions from "./model/RestCallOptions";


class JsApiProxy {
    private static instance: JsApiProxy
    static readonly uiBasePath: string = "sd/operator"
    static readonly restPath: string = "sd/services/rest"

    devMode = true
    devConfig: DevConfig | null = null
    devConfigFound = false
    apiFound = false

    constructor() {
        this.setup()
    }

    static getInstance() {
        if (this.instance == null) this.instance = new JsApiProxy()
        return this.instance
    }

    private setup() {
        const doBold = (str: string): string => {
            const bold = '\x1b[1m';
            const reset = '\x1b[0m';
            return bold + str + reset
        }
        const apiError = this.loadJsApi()
        const configError = this.loadConfig()
        let log = `${doBold("nsd js api proxy")}: \n${doBold("devMode")} ${this.devMode}\n`
        if (this.devMode) {
            log += `${doBold("devConfigFound")}: ${this.devConfigFound}`
            if (this.devConfigFound) log += `\n${doBold("host")}: ${this.devConfig?.host}\n`
            else log += `, cause: \n${configError}\n`
        } else {
            log += `${doBold("apiFound")}: ` + this.apiFound
            if (!this.apiFound) log += `, cause: ${apiError}\n`
        }
        console.log(log)
    }

    private loadConfig(): unknown | null {
        try {
            const config: DevConfig = require("../nsd.dev.config")
            this.devConfig = config as DevConfig
            this.devConfigFound = true
            return null
        } catch (error) {
            this.devConfigFound = false
            return error
        }
    }

    private loadJsApi(): unknown | null {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.parent.injectJsApi(window.parent, window)
            this.devMode = false
            this.apiFound = true
            return null
        } catch (error) {
            console.error("Ошибка при загрузке API:")
            console.error(error)
            this.devMode = true
            this.apiFound = false
            return error
        }
    }

    findApplicationCode(): string {
        if (this.devMode) {
            if (this.devConfigFound) {
                if (this.devConfig?.appCode == undefined) throw new Error("appCode is undefined")
                else return this.devConfig?.appCode
            } else throw new Error("dev config not found")
        } else return jsApi.findApplicationCode()
    }

    extractSubjectUuid(): string | null {
        if (this.devMode) {
            if (this.devConfigFound) {
                if (this.devConfig?.subjectUuid == undefined) throw new Error("subjectUuid is undefined")
                else return this.devConfig?.subjectUuid
            } else throw new Error("dev config not found")
        } else return jsApi.extractSubjectUuid()
    }

    registerAttributeToModification(attributeCode: string, resultCallback: () => void): void {
        if (!this.devMode) jsApi.registerAttributeToModification(attributeCode, resultCallback)
    }

    getCurrentUser(): Record<string, string | null> {
        if (this.devMode) {
            if (this.devConfigFound) {
                if (this.devConfig?.currentUserUuid == undefined) throw new Error("currentUserUuid is undefined")
                else return {"uuid": this.devConfig?.currentUserUuid}
            } else throw new Error("dev config not found")
        } else return jsApi.getCurrentUser()
    }

    getCurrentLocale(): string {
        if (this.devMode) {
            if (this.devConfigFound) {
                if (this.devConfig?.currentLocale == undefined) throw new Error("currentLocale is undefined")
                else return this.devConfig.currentLocale
            } else throw new Error("dev config not found")
        } else return jsApi.getCurrentLocale()
    }

    getAppBaseUrl(): string {
        if (this.devMode) {
            if (this.devConfigFound) {
                if (this.devConfig?.host == undefined) throw new Error("host is undefined")
                if (this.devConfig?.scheme == undefined) throw new Error("scheme is undefined")
                return this.devConfig.scheme + "://" + this.devConfig.host
            } else throw new Error("dev config not found")
        } else return jsApi.getAppBaseUrl()
    }

    getAppRestBaseUrl(): string {
        if (this.devMode) return this.getAppBaseUrl() + "/" + JsApiProxy.restPath
        else return jsApi.getAppRestBaseUrl()
    }

    getViewMode(): string {
        if (this.devMode) {
            if (this.devConfigFound) {
                if (this.devConfig?.viewMode == undefined) throw new Error("viewMode is undefined")
                else return this.devConfig.viewMode
            } else throw new Error("dev config not found")
        } else return jsApi.getViewMode()
    }

    async restCall(restOfTheUrl: string, options: RestCallOptions): Promise<string | ArrayBuffer | Blob | unknown> {
        if (this.devMode) {
            if (this.devConfigFound) {
                if (this.devConfig?.viewMode == undefined) throw new Error("viewMode is undefined")
                else {
                    const url = new URL(this.getAppRestBaseUrl() + "/" + restOfTheUrl)
                    url.searchParams.append("accessKey", this.devConfig.accessKey)
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
                        case RestCallResponseType.TEXT:
                            return response.text()
                        case RestCallResponseType.JSON:
                            return response.json()
                        case RestCallResponseType.ARRAYBUFFER:
                            return response.arrayBuffer()
                        case RestCallResponseType.BLOB:
                            return response.blob()
                    }
                }
            } else throw new Error("dev config not found")
        } else {
            if (typeof options.body == 'object') options.body = JSON.stringify(options.body)
            return jsApi.restCall(restOfTheUrl, options)
        }
    }

    //TODO протестировать
    async restCallAsJson(restOfTheUrl: string, options: RestCallOptions): Promise<unknown> {
        if (this.devMode) {
            options.responseType = RestCallResponseType.JSON
            return this.restCall(restOfTheUrl, options)
        } else return jsApi.restCallAsJson(restOfTheUrl, options)
    }

    //TODO протестировать
    async restCallModule(moduleCode: string, functionName: string, args: unknown[]): Promise<unknown> {
        if (this.devMode) {
            const restOfTheUrl = `exec?func=${moduleCode}&params=${args}&raw=true`
            return this.restCall(restOfTheUrl, {method: "GET",})
        } else return jsApi.restCallModule(moduleCode, functionName, args)
    }

}

// eslint-disable-next-line
export default JsApiProxy
