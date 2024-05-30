import HttpMethod from "./HttpMethod";
import ResponseType from "./ResponseType";

export default interface MakeRequestDto {
    url : string
    method : string | HttpMethod
    headers : Record<string, string>
    body : Record<string, unknown> | string | object
    responseType : ResponseType | string
}
