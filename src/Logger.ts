import JsApiProxy from "./JsApiProxy";

class Logger {
    private PREFIX = "JS_API_PROXY"
    private jsApiProxy : JsApiProxy
    enableMethodExecuteLogging : boolean = false

    private doMessage(message : string) {
        const bold = '\x1b[1m';
        const reset = '\x1b[0m';
        return `${bold}[${this.PREFIX}]${reset} ${message}`
    }

    infoLog(message : string){
        console.log(this.doMessage(message))
    }

    message(message : string) {
        alert(this.PREFIX + '\n' + message)
    }

    methodExecuteLog(message : string){
        this.infoLog(this.doMessage(`Вызван метод: ${message}`))
    }

    methodExecuteMessage(message : string) {
        this.message(`Вызван метод: ${message}`)
    }

    constructor(jsApiProxy : JsApiProxy) {
        this.jsApiProxy = jsApiProxy
    }
}

export default Logger
