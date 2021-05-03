export enum Operator {
    Equals = 'EQUALS',
    NotEquals = 'NOT_EQUALS',
}

export interface FilterConditions {
    field: string;
    operator: Operator;
    value: string;
}

export type ExtractionPeriod = FixedExtractionPeriod | IntervalExtractionPeriod;

export interface CCConfigurationModel {
    modelId: string;
    modelDisplayName: string;
    sources: string[];
    caseFilterConditions?: FilterConditions[];
    caseIdField: string;
    documentExtractionPeriod: ExtractionPeriod;
    fieldsForModelTraining: string[];
    fieldsToPredict: string[];
}

export interface FixedExtractionPeriod {
    startTime: number;
    endTime: number;
}

export interface IntervalExtractionPeriod {
    exportPeriod: string;
}
