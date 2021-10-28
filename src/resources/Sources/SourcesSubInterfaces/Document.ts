import {
    ExcerptSource,
    ExtensionSettingAction,
    ExtensionSettingActionOnError,
    ExtensionSettingConverter,
} from '../../Enums';

export interface DataFile {
    data?: string;
    sensitive?: boolean;
}

export interface CharsetDetectionHint {
    charset?: string;
    confidence?: number;
}

export interface DocumentProcessorParameters {
    condition?: any;
    deleteOnError?: boolean;
    values?: any;
}

export interface DocumentProcessor {
    parameters?: DocumentProcessorParameters;
    type?: string;
}

export interface ExtensionSetting {
    action?: ExtensionSettingAction;
    actionOnError?: ExtensionSettingActionOnError;
    convertDirectlyToHtml?: boolean;
    converter?: ExtensionSettingConverter;
    customConverter?: DocumentProcessor;
    excerptSource?: ExcerptSource;
    fileTypeValue?: string;
    generateThumbnail?: boolean;
    indexContainer?: boolean;
    openResultWithQuickView?: boolean;
    saveExcerptBlob?: boolean;
    summarizeDocument?: boolean;
    useContentType?: boolean;
    useExternalHTMLGenerator?: boolean;
}

export interface ExtensionSettingByExtension {
    extensionSetting?: ExtensionSetting;
    extensions?: string[];
}

export interface ExtensionSettings {
    byContentTypes?: ExtensionSettingByExtension[];
    byExtensions?: ExtensionSettingByExtension[];
    noExtension?: ExtensionSetting;
    other?: ExtensionSetting;
}

export interface LanguageHint {
    language?: string;
    probability?: number;
}

export interface XMLMetaData {
    name?: string;
    value?: string;
}

export interface XMLRecordDefinition {
    author?: string;
    body?: string;
    date?: string;
    dateFormat?: string;
    metaData?: XMLMetaData[];
    root?: string;
    summary?: string;
    title?: string;
    unescapeXMLEntities?: boolean;
    uniqueId?: string;
    uri?: string;
}

export interface DocumentProcessorConfig {
    addRawTextDataStream?: boolean;
    beautifyDocuments?: boolean;
    charsetDetectionHint?: CharsetDetectionHint;
    excelFloatingPointPrecision?: number;
    excerptSource?: ExcerptSource;
    extensionSettings?: ExtensionSettings;
    fieldMappingOrigin?: string;
    generateHTML?: boolean;
    imageMinimumSize?: number;
    indexExcelNumbers?: boolean;
    indexMeta?: boolean;
    languageHints?: LanguageHint[];
    languagesSettings?: string;
    maxHTMLOutputSize?: number;
    maxTextOutputSize?: number;
    maximumDocumentSize?: number;
    maximumNumberOfPagesToConvert?: number;
    openResultWithQuickView?: boolean;
    reportProgressionTimeout?: number;
    saveExcerptBlob?: boolean;
    styleSheet?: string;
    summarizeDocument?: boolean;
    summarySize?: number;
    timeout?: number;
    titleGrammaticalScoreWeight?: number;
    titleLengthProbabilityWeight?: number;
    titlePercentageOfCapsFirstLettersWeight?: number;
    titlePositionScoreWeight?: number;
    useClickableUriAsBasePath?: boolean;
    xmlrecordDefinitions?: XMLRecordDefinition[];
}

export interface DocumentConfig {
    documentProcessorConfig?: DocumentProcessorConfig;
    indexUri?: string;
    parameters?: any;
    postConversions?: DocumentProcessor[];
    preConversions?: DocumentProcessor[];
}
