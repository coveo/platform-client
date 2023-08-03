import {GranularResource} from '../../Entry.js';
import {DataStreamType, ExtensionLanguageType} from '../Enums.js';

type Version = 'v1' | 'v2';

export interface ExtensionModel {
    apiVersion: Version;
    content: string;
    createdDate: number;
    description: string;
    enabled: boolean;
    id: string;
    language: ExtensionLanguageType;
    lastModified: number;
    name: string;
    requiredDataStreams: DataStreamType[];
    status: {
        dailyStatistics: {
            averageDurationInSeconds: number;
            numberOfErrors: number;
            numberOfExecutions: number;
            numberOfSkips: number;
            numberOfTimeouts: number;
        };
        disabledStatus?: {
            disabledDate: number;
            reason: string;
        };
        durationHealth: {
            healthIndicator: string;
            reason: string;
        };
        lastAutoDisablingDate: number;
        lastDisablingDate: number;
        timeoutHealth: {
            healthIndicator: string;
            reason: string;
        };
        timeoutLikeliness: string;
    };
    usedBy: [
        {
            sourceId: string;
            sourceName: string;
        },
    ];
    versionId: string;
}

export interface CreateExtension extends GranularResource {
    content: string;
    name: string;
    apiVersion?: Version;
    description?: string;
    language?: ExtensionLanguageType;
    requiredDataStreams?: DataStreamType[];
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
