import JsApiProxy from "../JsApiProxy";
export default class Commands {
    private jsApiProxy;
    constructor(jsApiProxy: JsApiProxy);
    selectObjectDialog(classFqn: string, presentAttributesGroupCode: string): Promise<string | null>;
    changeState(uuid: string, state: string[]): void;
    editObject(uuid: string): void;
    quickAddObject(classFqn: string, formCode: string, properties: Record<string, unknown>, callback: Function): void;
    quickEditObject(uuid: string, formCode: string, properties: Record<string, unknown>, callback: Function): void;
}
//# sourceMappingURL=Commands.d.ts.map