import HttpMethod from "../HttpMethod";
import ResponseType from "../ResponseType";

export default interface MakeDto {
    url : string
    method : string | HttpMethod
    headers : Record<string, string>
    body : Record<string, unknown> | string | object
    responseType : ResponseType | string
}
