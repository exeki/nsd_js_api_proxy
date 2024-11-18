interface NsdJsApiCommands {
    selectObjectDialog(classFqn: string, presentAttributesGroupCode: string): Promise<string | null>

    changeState(uuid: string, states: string[]): void

    editObject(uuid: string): void

    quickAddObject(classFqn: string, formCode: string, properties: Record<string, unknown>, callback: function): void

    quickEditObject(uuid: string, formCode: string, properties: Record<string, unknown>, callback: function): void
}

interface NsdJsApiRequests {
    make(options: object): Promise<string, unknown>

    json(options: object): Promise<unknown, unknown>
}

interface NsdJsApiUrls {
    base(): string

    objectCard(uuid: string): string

    objectAddForm(fqn: string): string

    objectEditForm(uuid: string): string
}

interface NsdJsApiConfiguration {
    byContentCode(moduleCode: string, args: unknown[]): Promise<unknown, unknown>

    byDefault(moduleCode: string, args: unknown[]): Promise<unknown, unknown>
}

interface NsdJsApiWs {
    subscribe(destination: string, callback: function): void

    unsubscribe(destination: string): void

    connect(callback: function): void

    disconnect(): void

    send(destination: string, message: string): void
}

interface NsdJsApiEvents {
    addFieldChangeListener(attrCode: string, callback: function)

    onFullscreenDisabled(callback: function)

    onFullscreenEnabled(callback: function)

    onContentHide(callback: function)

    onContentShow(callback: function)
}

interface NsdJsApiForms {
    getValues(): Promise<unknown, unknown>

    changeResponsible(uuid: string): Promise<unknown, unknown>

    isModal(): boolean

    getType(): string

    //getParameters(): Promise<unknown, unknown>

    //getInitialHeight(): number

    //getHeight(): number

    //setHeight(height: number): Promise<unknown>
}

interface NsdJsApiEventActions {
    getEventActionExecutor(eventUuid: string): EventActionExecutor
}

interface EventActionExecutor {
    setSubject(uuid: string): EventActionExecutor

    setSubjects(uuids: string[]): EventActionExecutor

    /**
     * Объект с полем eventActionType при успешном запуске,
     * null | undefined в случае отмены выполнения действия пользователем (закрытие формы параметризованного пользовательского действия по событию)
     * Error в случае ошибки
     */
    execute(): Promise<{ eventActionType: 'async' | 'sync' } | null | undefined | Error>
}

interface NsdJsApiContents {
    getParameters(): Promise<string, any>

    getInitialHeight(): number

    getHeight(): number

    setHeight(height: number): Promise<{}>

    getIframeLayoutInfo(): Promise<{
        x: number,
        y: number,
        width: number,
        height: number,
        top: number,
        right: number,
        bottom: number,
        left: number
    }>
}

interface NsdJsApiModals {
    getBodyLayoutInfo(): Promise<{ top: number }>
}

interface NsdJsApiPage {
    getHeaderLayoutInfo() : Promise<{height: number}>
    getWindowLayoutInfo() : Promise<{innerWidth: number, innerHeight: number}>
}

interface NsdJsApi {

    commands: NsdJsApiCommands

    requests: NsdJsApiRequests

    urls: NsdJsApiUrls

    configuration: NsdJsApiConfiguration

    ws: NsdJsApiWs

    events: NsdJsApiEvents

    forms: NsdJsApiForms

    eventActions: NsdJsApiEventActions

    contents: NsdJsApiContents

    modals: NsdJsApiModals

    page : NsdJsApiPage

    findContentCode(): string

    findApplicationCode(): string

    extractSubjectUuid(): string | null

    registerAttributeToModification(attributeCode: string, resultCallback: function): void

    isAddForm(): boolean

    isEditForm(): boolean

    isOnObjectCard(): boolean

    getCurrentUser(): Record<string, string | null>

    getCurrentLocale(): string

    getAppBaseUrl(): string

    getAppRestBaseUrl(): string

    getViewMode(): 'fullScreen' | 'normal'

    restCall(restOfTheUrl: string, options: object): Promises<unknown>

    restCallAsJson(restOfTheUrl: string, options: object): Promise<unknown>

    restCallModule(moduleCode: string, functionName: string, args: unknown[]): Promise<unknown>

    getBrowserType() : 'webView' | 'browser'

    getWebViewType() : 'Android' | 'iOS' | null | 'null'
}

declare const jsApi: NsdJsApi
