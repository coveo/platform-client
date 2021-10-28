import {SourceExtensionActionOnError} from '../../Enums';

export interface SourceExtensionModel {
    actionOnError?: SourceExtensionActionOnError;
    condition?: string;
    extensionId?: string;
    itemType?: string;
    parameters?: Record<string, string>;
    versionId?: string;
}
