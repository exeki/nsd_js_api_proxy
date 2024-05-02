import RestCallResponseType from "@/nsd-js-api-proxy/model/RestCallResponseType";

interface RestCallOptions {
    method : string
    headers? : Record<string, string>
    body? : Record<string, unknown> | string | object
    responseType? : RestCallResponseType
}

export default RestCallOptions
