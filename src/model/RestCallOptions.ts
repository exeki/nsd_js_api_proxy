import ResponseType from "./ResponseType";

interface RestCallOptions {
    method : string
    headers? : Record<string, string>
    body? : Record<string, unknown> | string | object
    responseType? : ResponseType | string
}

export default RestCallOptions
