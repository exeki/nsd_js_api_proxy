export default interface MakeRequestDto {
    url : string
    method : "post" | "get"
    headers : Record<string, string>
    body : any
    responseType : "text" | "json" | "blob" | "arraybuffer"
}
