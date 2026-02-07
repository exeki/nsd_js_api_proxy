export default interface DevConfig {
    scheme: string;
    host: string;
    accessKey: string;
    subjectUuid?: string | null | undefined;
    appCode?: string | null | undefined;
    isAddForm?: boolean | undefined;
    isEditForm?: boolean | undefined;
    isOnObjectCard?: boolean | undefined;
    contentCode?: string | undefined;
    currentUserUuid?: string | null | undefined;
    currentUserLogin?: string | null | undefined;
    currentLocale?: string | undefined;
    viewMode?: string | undefined;
    objectDialogSelectionResult?: Record<string, string | null> | undefined;
    currentContentParameters?: Record<string, any> | undefined;
    appInitialHeight?: number | undefined;
    devFetchMode?: "cors" | "no-cors" | "navigate" | "same-origin" | undefined;
    formValues: Record<string, any>;
    changeResponsibleResult: Record<string, string[]> | undefined | null;
}
//# sourceMappingURL=DevConfig.d.ts.map