export interface PipelineBackendVersion {
    version: '1' | '2';
}

export interface PipelineModel {
    id: string;
    name: string;
    isDefault?: boolean;
    condition?: any;
    created_by?: string;
    description?: string;
    filter?: any;
    last_modified_by?: string;
    position?: number;
    splitTestEnabled?: boolean;
    splitTestName?: string;
    splitTestRatio?: number;
    splitTestTarget?: string;
}
