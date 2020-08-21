import {GranularResource} from '../BaseInterfaces';
import {
    ActivityOperation,
    AuthenticationActionMethod,
    AuthenticationInputType,
    DocumentPermissionState,
    ExcerptSource,
    ExtensionSettingAction,
    ExtensionSettingActionOnError,
    ExtensionSettingConverter,
    FieldTypes,
    FilterHostType,
    FilterLastOperationResultType,
    FilterLastOperationType,
    FilterStatusType,
    FormAuthenticationFailedMethod,
    FormInputType,
    MappingModelKind,
    OperationType,
    PatternType,
    PermissionIdentityType,
    SecurityProviderType,
    SinglePermissionIdentityType,
    SinglePermissionResult,
    SinglePermissionState,
    SortingOrder,
    SortingType,
    SourceExtensionActionOnError,
    SourceSecurityOption,
    SourceStatusType,
    SourceType,
    SourceVisibility,
    UrlFilterType,
} from '../Enums';
import {
    CascadingSecurityProvider,
    SecurityProvider,
    SecurityProviderReferenceModel,
} from '../SecurityCache/SecurityCacheInterfaces';

export interface SearchPageModel {
    id: string;
    name: string;
    title: string;
    html?: string;
    javascript?: JavaScriptResourceModel[];
    css?: CSSResourceModel[];
    lastModified?: string;
}

export interface CreateSearchPageModel extends Pick<SearchPageModel, 'name' | 'title'> {}

export interface UpdateSearchPageModel extends Pick<SearchPageModel, 'name' | 'title' | 'html'> {}

export type JavaScriptResourceModel = SearchPageResourceModel;

export type CSSResourceModel = SearchPageResourceModel;

export type SearchPageResourceModel = SearchPageResourceModelWithUrl | SearchPageResourceModelWithInlineContent;

export interface SearchPageResourceModelBasics {
    name: string;
}

export interface SearchPageResourceModelWithUrl extends SearchPageResourceModelBasics {
    url: string;
}

export interface SearchPageResourceModelWithInlineContent extends SearchPageResourceModelBasics {
    inlineContent: string;
}

export interface SearchPageVersionModel {
    current?: MajorMinorVersion;
    available: MajorMinorVersion[];
    latest: MajorMinorVersion;
    upgradable: boolean;
}

export interface ListSearchPagesParams {
    name?: string;
}

export interface MajorMinorVersion {
    major: string;
    minor: string;
}
