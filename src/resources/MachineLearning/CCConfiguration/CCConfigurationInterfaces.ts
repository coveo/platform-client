export enum Operator {
    Equals = 'EQUALS',
    NotEquals = 'NOT_EQUALS',
}

export interface FilterConditions {
    field: string;
    operator: Operator;
    value: string;
}

export interface CCConfigurationModelBase {
    modelId: string;
    modelDisplayName: string;
    sources: string[];
    caseFilterConditions?: FilterConditions[];
    caseIdField: string;
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

export type ExtractionPeriod = FixedExtractionPeriod | IntervalExtractionPeriod;

export type CCConfigurationModel = CCConfigurationModelBase & ExtractionPeriod;
