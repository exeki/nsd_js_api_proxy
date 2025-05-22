import JsApiProxy from "../JsApiProxy";
import RequestDto from "../model/MakeRequestDto";
export default class Requests {
    private jsApiProxy;
    constructor(jsApiProxy: JsApiProxy);
    private devRestCall;
    make(options: RequestDto): Promise<any>;
    json(options: RequestDto): Promise<object>;
}
//# sourceMappingURL=Requests.d.ts.map