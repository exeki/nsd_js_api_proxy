export default interface DevConfig {
    scheme: string
    host: string
    accessKey: string
    subjectUuid?: string | null | undefined
    appCode?: string | null | undefined
    isAddForm?: boolean | undefined
    isEditForm?: boolean | undefined
    isOnObjectCard?: boolean | undefined
    currentUserUuid?: string | null | undefined
    currentLocale? : string | undefined
    viewMode? : string | undefined
    objectDialogSelectionResult? : Record<string, string | null> | undefined
    currentContentParameters? : Record<string, any> | undefined
    appInitialHeight? : number | undefined
}
