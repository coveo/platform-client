export interface ResourceSnapshotsModel {
    createdBy: string;
    createdDate: number;
    developerNote?: string;
    id: string;
    originId?: string;
    targetId?: string;
}

export interface PushSnapshotOptions {
    targetId: string;
    developerNotes?: string;
}
