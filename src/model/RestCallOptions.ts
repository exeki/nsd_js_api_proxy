interface RestCallOptions {
    method : string
    headers? : Record<string, string>
    body? : unknown
    responseType? : "text" | "json" | "blob" | "arraybuffer"
}

export default RestCallOptions
