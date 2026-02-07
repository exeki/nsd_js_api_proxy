import JsApiProxy from "./JsApiProxy";

class Logger {
    private PREFIX = "JS_API_PROXY"
    private jsApiProxy : JsApiProxy
    enableMethodExecuteLogging : boolean = false
    enableMethodExecuteMessaging : boolean = true

    private doMessage(message : string) {
        const bold = '\x1b[1m';
        const reset = '\x1b[0m';
        return `${bold}[${this.PREFIX}]${reset} ${message}`
    }

    infoLog(message : string){
        if(this.jsApiProxy.isDevMode()) console.log(this.doMessage(message))
    }

    message(message : string) {
        if(this.jsApiProxy.isDevMode()) alert(this.PREFIX + '\n' + message)
    }

    methodExecuteLog(message : string){
        if(this.enableMethodExecuteLogging) this.infoLog(`Вызван метод: ${message}`)
    }

    methodExecuteMessage(message : string) {
        if(this.enableMethodExecuteMessaging) this.message(`Вызван метод: ${message}`)
    }

    constructor(jsApiProxy : JsApiProxy) {
        this.jsApiProxy = jsApiProxy
    }
}

export default Logger
