export interface ResourceSnapshotsModel {
    createdBy: string;
    createdDate: number;
    developerNote?: string;
    id: string;
    originId?: string;
    targetId?: string;
}

export interface ResourceSnapshotUrlModel {
    url: string;
    urlExpiration: number;
}

export interface PushSnapshotOptions {
    targetOrganizationId: string;
    developerNotes?: string;
}
