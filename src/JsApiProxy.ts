import DevConfig from "./model/DevConfig";
import RestCallResponseType from "./model/RestCallResponseType";
import RestCallOptions from "./model/RestCallOptions";
import path from "path";
import fs from "fs";
import os from "os";


class JsApiProxy {
    static readonly uiBasePath: string = "sd/operator"
    static readonly restPath: string = "sd/services/rest"
    static readonly configFileName: string = "nsd_js_dev_config.json"

    private static instance: JsApiProxy

    private devMode = true
    private devConfig: DevConfig | null = null
    private devConfigFound = false
    private apiFound = false

    constructor() {
        this.setup()
    }

    static getInstance() {
        if (this.instance == null) this.instance = new JsApiProxy()
        return this.instance
    }

    isDevMode(): boolean {
        return this.devMode
    }

    isApiFound(): boolean {
        return this.apiFound
    }

    isDevConfigFound(): boolean {
        return this.devConfigFound
    }

    getDevConfig(): DevConfig | null {
        return this.devConfig
    }

    setDevConfig(config: DevConfig) {
        this.devConfig = config
        this.devConfigFound = true
    }

    private setup() {
        const doBold = (str: string): string => {
            const bold = '\x1b[1m';
            const reset = '\x1b[0m';
            return bold + str + reset
        }
        const apiError = this.loadJsApi()
        const configState = this.loadDevConfig()
        let log = `${doBold("nsd js api proxy")}: \n${doBold("devMode")}: ${this.devMode}\n`
        if (this.devMode) {
            log += `${doBold("devConfigFound")}: ${this.devConfigFound}`
            if (this.devConfigFound) {
                if(configState == 1) log += ` (from project dir)`
                if(configState == 2) log += ` (from user home dir)`
                log += `\n${doBold("host")}: ${this.devConfig?.host}\n`
            }
            else log += `, cause: \n${configState}\n`
        } else {
            log += `${doBold("apiFound")}: ` + this.apiFound
            if (!this.apiFound) log += `, cause: ${apiError}\n`
        }
        console.log(log)
    }

    private loadDevConfig(): unknown | null | number {
        let fs
        let path
        let os

        try {
            fs = require('fs')
            path = require('path')
            os = require('os')
        } catch (error) {
            return "Not in node environment"
        }

        try {
            const configPath: string = path.join(process.cwd(), JsApiProxy.configFileName);
            const configContent: string = fs.readFileSync(configPath, 'utf8');
            this.devConfig = JSON.parse(configContent) as DevConfig
            this.devConfigFound = true
            return 1
        } catch (error) {
            try {
                const homeDir = os.homedir();
                const configPath: string = path.join(homeDir, "nsd_sdk", "conf", JsApiProxy.configFileName);
                const configContent: string = fs.readFileSync(configPath, 'utf8');
                this.devConfig = JSON.parse(configContent) as DevConfig
                this.devConfigFound = true
                return 2
            } catch (error2) {
                this.devConfigFound = false
                return error2
            }
        }
    }

    private loadJsApi(): unknown | null {
        try {
            process.cwd()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.parent.injectJsApi(window.parent, window)
            this.devMode = false
            this.apiFound = true
            return null
        } catch (error) {
            this.devMode = true
            this.apiFound = false
            return error
        }
    }

    isOnObjectCard() : boolean {
        if (this.devMode) {
            if (this.devConfigFound) {
                if (this.devConfig?.isOnObjectCard == undefined) throw new Error("isOnObjectCard is undefined")
                else return this.devConfig?.isOnObjectCard
            } else throw new Error("dev config not found")
        } else return jsApi.isOnObjectCard()
    }

    isAddForm() : boolean {
        if (this.devMode) {
            if (this.devConfigFound) {
                if (this.devConfig?.isAddForm == undefined) throw new Error("isAddForm is undefined")
                else return this.devConfig?.isAddForm
            } else throw new Error("dev config not found")
        } else return jsApi.isAddForm()
    }

    isEditForm() : boolean {
        if (this.devMode) {
            if (this.devConfigFound) {
                if (this.devConfig?.isEditForm == undefined) throw new Error("isEditForm is undefined")
                else return this.devConfig?.isEditForm
            } else throw new Error("dev config not found")
        } else return jsApi.isEditForm()
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
