export default interface RestCallOptions {
    method? : "POST" | "GET"
    headers? : Record<string, string>
    body? : any
    responseType? : "text" | "json" | "blob" | "arraybuffer"
}

