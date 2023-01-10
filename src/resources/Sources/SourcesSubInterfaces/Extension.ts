import {SourceExtensionActionOnError} from '../../Enums.js';

export interface SourceExtensionModel {
    actionOnError?: SourceExtensionActionOnError;
    condition?: string;
    extensionId?: string;
    itemType?: string;
    parameters?: Record<string, string>;
    versionId?: string;
}
