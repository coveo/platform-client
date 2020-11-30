import {SubscriptionFrequencyEnum, SubscriptionStatusHealthIndicatorEnum, SubscriptionTypeEnum} from '../../Enums';

export interface EditSubscriptionModel {
    description?: string;
    enabled: boolean;
    frequency: SubscriptionFrequencyEnum;
    name: string;
    parameters?: SubscriptionParameters;
    pattern?: SubscriptionPatternModel;
    type: SubscriptionTypeEnum;
}

export interface SubscriptionModel extends EditSubscriptionModel {
    createdDate: number;
    id: string;
    lastModified: number;
    organizationId: string;
    status?: SubscriptionStatusModel;
    userId: string;
}

export interface SubscriptionParameters {
    emailRecipients?: string[];
    emailSubject?: string;
    fromDisplayName?: string;
    serviceUrl?: string;
}

export interface SubscriptionPatternModel {
    content: Record<string, unknown>;
    operations: string[];
    resourceTypes: string[];
    resultTypes: string[];
}

export interface SubscriptionStatusModel {
    healthIndicator: SubscriptionStatusHealthIndicatorEnum;
    latestResponseMessage: string;
    statistics: SubscriptionStatisticsModel;
}

export interface SubscriptionStatisticsModel {
    numberOfCancellations: number;
    numberOfErrors: number;
    numberOfFailures: number;
    numberOfSucces: number;
}
