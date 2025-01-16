import DevConfig from "./model/DevConfig";
import RestCallOptions from "./model/RestCallOptions";
import Logger from "./Logger";
import Commands from "./modules/Commands";
import Configuration from "./modules/Configuration";
import Contents from "./modules/Contents";
import Events from "./modules/Events";
import Requests from "./modules/Requests";
import Urls from "./modules/Urls";
import Ws from "./modules/Ws";

class JsApiProxy {
    static readonly uiBasePath: string = "operator"
    static readonly restPath: string = "services/rest"
    static readonly configFileName: string = "nsd_js_dev_config.json"

    private static instance: JsApiProxy

    private devMode = true
    private apiFound = false

    readonly commands: Commands
    readonly configuration: Configuration
    readonly contents: Contents
    readonly events: Events
    readonly requests: Requests
    readonly urls: Urls
    readonly ws: Ws

    devConfig: DevConfig
    readonly logger: Logger = new Logger(this)

    private constructor(devConfig: DevConfig) {

        this.devConfig = devConfig

        this.setup()

        this.logger = new Logger(this)

        this.contents = new Contents(this)
        this.commands = new Commands(this)
        this.configuration = new Configuration(this)
        this.events = new Events(this)
        this.requests = new Requests(this)
        this.urls = new Urls(this)
        this.ws = new Ws(this)

        this.setMethodLogging(this.devMode)
    }

    static getInstance(devConfig: DevConfig) {
        if (this.instance == null) this.instance = new JsApiProxy(devConfig)
        return this.instance
    }

    setMethodLogging(bool : boolean) {
        this.logger.enableMethodExecuteLogging = bool
    }

    isDevMode(): boolean {
        return this.devMode
    }

    isApiFound(): boolean {
        return this.apiFound
    }

    isDevConfigFound(): boolean {
        return this.devConfig != null
    }

    getDevConfig(): DevConfig | null {
        return this.devConfig
    }

    setDevConfig(config: DevConfig) {
        this.devConfig = config
    }

    private setup() {
        const doBold = (str: string): string => {
            const bold = '\x1b[1m';
            const reset = '\x1b[0m';
            return bold + str + reset
        }
        const apiError = this.loadJsApi()
        let log = `\n${doBold("devMode")}: ${this.devMode}\n`
        if (this.devMode) {
            log += `${doBold("devConfigFound")}: ${this.devConfig != null}`
            if (this.devConfig != null) log += `\n${doBold("host")}: ${this.devConfig?.host}\n`
        } else {
            log += `${doBold("apiFound")}: ` + this.apiFound
            if (!this.apiFound) log += `, cause: ${apiError}\n`
        }
        this.logger.infoLog(log)
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
            this.devMode = true
            this.apiFound = false
            return error
        }
    }

    isOnObjectCard(): boolean {
        this.logger.methodExecuteLog("jsApi.isOnObjectCard()")
        if (this.devMode) {
            if (this.devConfig?.isOnObjectCard == undefined) throw new Error("isOnObjectCard is undefined")
            else return this.devConfig?.isOnObjectCard
        } else return jsApi.isOnObjectCard()
    }

    isAddForm(): boolean {
        this.logger.methodExecuteLog("jsApi.isAddForm()")
        if (this.devMode) {
            if (this.devConfig?.isAddForm == undefined) throw new Error("isAddForm is undefined")
            else return this.devConfig?.isAddForm
        } else return jsApi.isAddForm()
    }

    isEditForm(): boolean {
        this.logger.methodExecuteLog("jsApi.isEditForm()")
        if (this.devMode) {
            if (this.devConfig?.isEditForm == undefined) throw new Error("isEditForm is undefined")
            else return this.devConfig?.isEditForm
        } else return jsApi.isEditForm()
    }

    findApplicationCode(): string {
        this.logger.methodExecuteLog("jsApi.findApplicationCode()")
        if (this.devMode) {
            if (this.devConfig?.appCode == undefined) throw new Error("appCode is undefined")
            else return this.devConfig?.appCode
        } else return jsApi.findApplicationCode()
    }

    findContentCode(): string {
        this.logger.methodExecuteLog("jsApi.findApplicationCode()")
        if (this.devMode) {
            if (this.devConfig?.contentCode == undefined) throw new Error("contentCode is undefined")
            else return this.devConfig.contentCode
        } else return jsApi.findContentCode()
    }

    extractSubjectUuid(): string | null {
        this.logger.methodExecuteLog("jsApi.extractSubjectUuid()")
        if (this.devMode) {
            if (this.devConfig?.subjectUuid == undefined) throw new Error("subjectUuid is undefined")
            else return this.devConfig?.subjectUuid
        } else return jsApi.extractSubjectUuid()
    }

    registerAttributeToModification(attributeCode: string, resultCallback: () => void): void {
        this.logger.methodExecuteLog(`jsApi.registerAttributeToModification(${attributeCode}, resultCallback)`)
        if (!this.devMode) jsApi.registerAttributeToModification(attributeCode, resultCallback)
    }

    getCurrentUser(): Record<string, string | null> {
        this.logger.methodExecuteLog(`jsApi.getCurrentUser()`)
        if (this.devMode) {
            if (this.devConfig?.currentUserUuid == undefined) throw new Error("currentUserUuid is undefined")
            else return {"uuid": this.devConfig?.currentUserUuid}
        } else return jsApi.getCurrentUser()
    }

    getCurrentLocale(): string {
        this.logger.methodExecuteLog(`jsApi.getCurrentLocale()`)
        if (this.devMode) {
            if (this.devConfig?.currentLocale == undefined) throw new Error("currentLocale is undefined")
            else return this.devConfig.currentLocale
        } else return jsApi.getCurrentLocale()
    }

    getAppBaseUrl(): string {
        this.logger.methodExecuteLog(`jsApi.getAppBaseUrl()`)
        if (this.devMode) {
            if (this.devConfig?.host == undefined) throw new Error("host is undefined")
            if (this.devConfig?.scheme == undefined) throw new Error("scheme is undefined")
            return this.devConfig.scheme + "://" + this.devConfig.host + "/sd/"
        } else return jsApi.getAppBaseUrl()
    }

    getAppRestBaseUrl(): string {
        this.logger.methodExecuteLog(`jsApi.getAppRestBaseUrl()`)
        if (this.devMode) {
            return this.devConfig.scheme + "://" + this.devConfig.host + "/sd/" + "/" + JsApiProxy.restPath
        } else return jsApi.getAppRestBaseUrl()
    }

    getViewMode(): string {
        this.logger.methodExecuteLog(`jsApi.getViewMode()`)
        if (this.devMode) {
            if (this.devConfig?.viewMode == undefined) throw new Error("viewMode is undefined")
            else return this.devConfig.viewMode
        } else return jsApi.getViewMode()
    }

    private async devRestCall(restOfTheUrl: string, options: RestCallOptions): Promise<any> {
        const url = new URL( `${this.devConfig.scheme}://${this.devConfig.host}/sd/${JsApiProxy.restPath}/${restOfTheUrl}`)
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
                mode : this.devConfig.devFetchMode
            }
        )
        if(response.ok) {
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
        } else {
            return {
                status : response.status,
                statusText : response.statusText,
                responseText : await response.text()
            }
        }

    }

    async restCall(restOfTheUrl: string, options: RestCallOptions): Promise<any> {
        this.logger.methodExecuteLog(`jsApi.restCall(${restOfTheUrl}, ${options})`)
        if (this.devMode) {
            return await this.devRestCall(restOfTheUrl, options)
        } else {
            if (typeof options.body !== 'string') options.body = JSON.stringify(options.body)
            return jsApi.restCall(restOfTheUrl, options)
        }
    }

    //TODO протестировать, а точно ли тут нужно присваивать responseType
    async restCallAsJson(restOfTheUrl: string, options: RestCallOptions): Promise<any> {
        this.logger.methodExecuteLog(`jsApi.restCallAsJson(${restOfTheUrl}, ${options})`)
        if (this.devMode) {
            options.responseType = "json"
            return await this.devRestCall(restOfTheUrl, options)
        } else return jsApi.restCallAsJson(restOfTheUrl, options)
    }

    //TODO протестировать, хз как будут работать аргументы
    async restCallModule(moduleCode: string, functionName: string, args: unknown[]): Promise<unknown> {
        this.logger.methodExecuteLog(`jsApi.restCallModule(${moduleCode}, ${functionName}, ${args})`)
        if (this.devMode) {
            const restOfTheUrl = `exec?func=${moduleCode}&params=${args}&raw=true`
            return this.devRestCall(restOfTheUrl, {method: "GET",})
        } else return jsApi.restCallModule(moduleCode, functionName, args)
    }
}

// eslint-disable-next-line
export default JsApiProxy
