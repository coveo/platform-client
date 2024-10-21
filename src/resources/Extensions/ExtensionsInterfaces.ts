import {GranularResource} from '../../Entry.js';
import {DataStreamType, ExtensionLanguageType} from '../Enums.js';

type Version = 'v1' | 'v2';

export interface ExtensionHealthModel {
    /**
     * A qualitative health indicator.
     *
     */
    healthIndicator: 'GOOD' | 'WARNING' | 'PROBLEMATIC' | 'UNKNOWN';
    /**
     * Additional details if healthIndicator value is `WARNING` or `PROBLEMATIC`.
     */
    reason: string;
}

export interface ExtensionDisabledStatusModel {
    /**
     * The extension disablement date (in number of milliseconds since UNIX epoch).
     * @example 1556034174000
     */
    disabledDate: number;
    /**
     * The reason why the extension was disabled.
     */
    reason: string;
}

export interface ExtensionStatisticsModel {
    /**
     * The average extension execution duration in seconds.
     */
    averageDurationInSeconds: number;
    /**
     * The number of extension executions for which the script returned an error.
     */
    numberOfErrors: number;
    /**
     * The total number of executions of the extension.
     */
    numberOfExecutions: number;
    /**
     * The number of times the extension was not executed due to any of the following reasons:
     * - The extension condition was evaluated to false.
     * - The extension timed out.
     * - The extension was disabled.
     */
    numberOfSkips: number;
    /**
     * The number of executions that reached the maximum execution time (default of 5 seconds).
     */
    numberOfTimeouts: number;
}

export interface ExtensionStatusModel {
    /**
     * Execution statistics pertaining to an extension over the past 24 hours (for all items from all sources to which the extension applies).
     */
    dailyStatistics: ExtensionStatisticsModel;
    /**
     * Information regarding the disabled state of an extension, if applicable.
     */
    disabledStatus?: ExtensionDisabledStatusModel;
    /**
     * Information regarding a health characteristic of the extension.
     */
    durationHealth: ExtensionHealthModel;
    /**
     * The last date at which the extension was automatically disabled by the service, (in number of milliseconds since UNIX epoch).
     * @example 1533916446000
     */
    lastAutoDisablingDate: number;
    /**
     * @deprecated use lastAutoDisablingDate instead.
     */
    lastDisablingDate: number;
    /**
     * Information regarding a health characteristic of the extension.
     */
    timeoutHealth: ExtensionHealthModel;
    /**
     * A qualitative indicator of the likelihood that the extension will time out.
     *
     */
    timeoutLikeliness: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ExtensionUsedByModel {
    /**
     * The unique identifier of the source.
     * @example mycoveocloudv2organizationg8tp8wu3-tqv7hb5wfju45im3lnuvtw2moq
     */
    sourceId: string;
    /**
     * The name of the source.
     * @example mysource
     */
    sourceName: string;
}

export interface ExtensionModel {
    /**
     * The api version.
     */
    apiVersion: Version;
    /**
     * The body of the extension (user script), written in Python using the [document object](https://docs.coveo.com/en/34/index-content/document-object-python-api-reference).
     */
    content: string;
    /**
     * The creation date of the extension (in number of milliseconds since UNIX epoch).
     * @example 1556034174000
     */
    createdDate: number;
    /**
     * A description of the extension
     */
    description: string;
    /**
     * Whether the extension is enabled.
     *
     * Note: Disabled extensions are not executed.
     */
    enabled: boolean;
    /**
     * The unique identifier of the extension.
     * @example mycoveocloudv2organizationg8tp8wu3-vwlyqfbtjkotxqkmrxqjcbcpoy
     */
    id: string;
    /**
     * The Python version.
     */
    language: ExtensionLanguageType;
    /**
     * The last modification date of the extension (in number of milliseconds since UNIX epoch).
     * @example 1556308241000
     */
    lastModified: number;
    /**
     * The name of the extension.
     */
    name: string;
    /**
     * The [data streams](https://docs.coveo.com/en/2891/glossary/data-stream) required by the extension.
     */
    requiredDataStreams: DataStreamType[];
    /**
     * Status details of an extension.
     */
    status: ExtensionStatusModel;
    /**
     * The sources the extension applies to.
     *
     * Note: Only returned when performing GET/PUT /extensions/{extensionId} requests.
     */
    usedBy: ExtensionUsedByModel[];
    /**
     * Whether the extension uses vault parameters or not.
     */
    useVault?: boolean;
    /**
     * The unique identifier of the extension version.
     * @example hdJSDb4hTkdnsCynNtF.d657FgLSDydcj
     */
    versionId: string;
}

export interface CreateExtension extends GranularResource {
    /**
     * The body of the extension (user script), written in Python using the [document object](https://docs.coveo.com/en/34/index-content/document-object-python-api-reference).
     */
    content: string;
    /**
     * A name for the extension.
     */
    name: string;
    /**
     * The api version.
     */
    apiVersion?: Version;
    /**
     * A description of the extension.
     */
    description?: string;
    /**
     * The Python version.
     */
    language?: ExtensionLanguageType;
    /**
     * The [data streams](https://docs.coveo.com/en/2891/glossary/data-stream) required by the extension.
     */
    requiredDataStreams?: DataStreamType[];
    /**
     * Whether the extension uses vault parameters or not.
     */
    useVault?: boolean;
}

export interface ExtensionCompileCode {
    /**
     * The extension's code that is compiled.
     */
    code: string;
    /**
     * The langugage of the compiled code.
     */
    language: ExtensionLanguageType;
}

export interface ExtensionCompileResult {
    error: ExtensionCompileError;
    /**
     * Whether the extension's script's compilation was successful.
     */
    successful: boolean;
}

export interface ExtensionCompileError {
    /**
     * The line number where the error occurred.
     */
    line: number;
    /**
     * The compilation error message.
     */
    message: string;
    /**
     * The specific offset in the line where the error occured.
     */
    offset: number;
    /**
     * The compilation error type.
     */
    type: string;
}

/**
 * An [extension](https://docs.coveo.com/en/206/) version.
 */
export interface ExtensionContentVersionModel {
    /**
     * The date at which the extension version was created (in number of milliseconds since UNIX epoch), i.e., the date of the modification of the extension when this extension version was created.
     * @example 1556308241000
     */
    lastModified: number;
    /**
     * The unique identifier of the extension target version.
     * @example hdJSDb4hTkdnsCynNtF.d657FgLSDydcj
     */
    id: string;
}
