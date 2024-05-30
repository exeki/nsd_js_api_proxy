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

interface NsdJsApiContents {
    getParameters(): Promise<string, any>

    getInitialHeight(): number

    getHeight(): number

    setHeight(height: number): Promise<{}>
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

    getParameters(): Promise<unknown, unknown>

    getInitialHeight(): number

    getHeight(): number

    setHeight(height: number): Promise<unknown>
}

interface NsdJsApi {

    commands: NsdJsApiCommands

    requests: NsdJsApiRequests

    urls: NsdJsApiUrls

    configuration: NsdJsApiConfiguration

    ws: NsdJsApiWs

    events: NsdJsApiEvents

    forms: NsdJsApiForms

    contents : NsdJsApiContents

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

    getViewMode(): string

    restCall(restOfTheUrl: string, options: object): Promises<unknown>

    restCallAsJson(restOfTheUrl: string, options: object): Promise<unknown>

    restCallModule(moduleCode: string, functionName: string, args: unknown[]): Promise<unknown>
}

declare const jsApi: NsdJsApi
