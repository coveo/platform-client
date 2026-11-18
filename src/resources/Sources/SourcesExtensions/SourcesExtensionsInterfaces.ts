import {SourceExtensionModel} from '../SourcesSubInterfaces/index.js';

export interface SourceExtensionsModel {
    /**
     * The preconversion extension configurations.
     */
    preConversionExtensions?: SourceExtensionModel[];
    /**
     * The postconversion extension configurations.
     */
    postConversionExtensions?: SourceExtensionModel[];
}

export interface SourceExtensionsMap {
    /**
     * The extension configurations that apply to all items of the source.
     */
    common?: SourceExtensionsModel;
    /**
     * The extension configurations that apply to specific item types.
     * The key is the item type, and the value object describes the extension configurations.
     * @example {"Video": {"postConversionExtensions": [{"extensionId": "mycoveocloudv2organizationg8tp8wu3-vwlyqfbtjkotxqkmrxqjcbcpoy"}]}}
     */
    items?: Record<string, SourceExtensionsModel>;
}

export interface UpdateSourceExtensionsOptions {
    /**
     * Whether to rebuild the source after the operation.
     * @default false
     */
    rebuild?: boolean;
}
