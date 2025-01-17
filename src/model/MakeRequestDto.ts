import RestCallOptions from "./RestCallOptions";

export default interface MakeRequestDto extends RestCallOptions {
    url: string
}
