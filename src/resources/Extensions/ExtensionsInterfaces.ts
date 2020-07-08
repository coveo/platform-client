export interface ExtensionModel {
    apiVersion: string;
    autoMigrated: true;
    content: string;
    createdDate: number;
    description: string;
    enabled: boolean;
    id: string;
    language: string;
    lastModified: number;
    name: string;
    requiredDataStreams: string[];
    status: {
        dailyStatistics: {
            averageDurationInSeconds: number;
            numberOfErrors: number;
            numberOfExecutions: number;
            numberOfSkips: number;
            numberOfTimeouts: number;
        };
        disabledStatus: {
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
