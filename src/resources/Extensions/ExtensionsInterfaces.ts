import {GranularResource} from '../../Entry';
import {DataStreamType, ExtensionLanguageType} from '../Enums';

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
        }
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
