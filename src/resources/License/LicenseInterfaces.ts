import {
    IndexBackupTypes,
    IndexType,
    ProductEdition,
    ProductName,
    ProductType,
    ScheduleType,
    SourceType,
    SourceVisibility,
} from '../Enums.js';

export interface LicenseConnectorScheduleModel {
    /**
     * The refresh type of use for a given connector.
     */
    refreshType: string;
    /**
     * The frequency at which to refresh the connector.
     */
    scheduleFrequencies: ScheduleType[];
}

export interface LicenseConnectorModel {
    /**
     * Whether the connector is allowed to execute.
     */
    allowed: boolean;
    /**
     * A set of schedule models that are allowed to refresh the connector
     */
    allowedSchedules: LicenseConnectorScheduleModel[];
    /**
     * The visibility level of the connector
     */
    sourceVisibilities: SourceVisibility[];
    /**
     * The type of connector
     */
    type: SourceType;
}

export interface LicenseModel {
    /**
     * The unique identifier of the account that created the organization.
     */
    accountId: string;
    /**
     * The name of the account.
     */
    accountName: string;
    /**
     * A set of connectors that the license has access to.
     */
    connectors: LicenseConnectorModel[];
    /**
     * The department the organization was created for.
     */
    department: string;
    /**
     * A set of entitlements describing what the organization has access to.
     */
    entitlements: EntitlementModel[];
    /**
     * The date at which the license will expire in number of milliseconds since UNIX epoch.
     */
    expirationDate: number;
    /**
     * The index backup type in Coveo Cloud V2.
     */
    indexBackupType: IndexBackupTypes;
    /**
     * The type of index that is used for all sources in an organization.
     */
    indexType: IndexType;
    /**
     * The level of monitoring to apply to the license
     */
    monitoringLevel: LicenseMonitoringLevel;
    /**
     * The edition of Coveo Cloud in which the organization is registered as.
     */
    productEdition: ProductEdition;
    /**
     * The product integration of which the organization has been registered.
     */
    productName: ProductName;
    /**
     * The type of product integration in which the organization has been registered.
     */
    productType: ProductType;
    /**
     * Various properties/configurations settings that apply to the organization.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: any;
    /**
     * The type of the license
     */
    type: string;
    /**
     * The license of every machine learning model.
     */
    LicenseMachineLearningModel: LicenseMachineLearningModel;
}

export interface EntitlementModel {
    /**
     * Limit of items
     */
    itemLimit: number;
    /**
     * Limit of Queries Per Month for product listing
     */
    lrpmLimit: number;
    /**
     * The unique identifier of the entitlement
     */
    id: string;
    /**
     * The unique identifier of the product on Salesforce
     */
    productId: string;
    /**
     * Name of the product on Salesforce
     */
    productName: string;
    /**
     * Unit on which the price is based on
     */
    pricingUnit: string;
    /**
     * Name of the product on Coveo
     */
    displayName: string;
    /**
     * Queries per month limit
     */
    qpmLimit: number;
    /**
     * Reommendation Limit
     */
    recommendationLimit: number;
    /**
     * Status of the entitlement
     */
    status: string;
    /**
     * Flag that informs if entitlement allow unlimited Queries Per Month
     */
    unlimitedQPM: boolean;
    /**
     * Flag that informs if entitlement allow unlimited recommendations
     */
    unlimitedRecommendations: boolean;
    /**
     * Flag that informs if entitlement allow unlimited users
     */
    unlimitedUsers: boolean;
    /**
     * Use case of the entitlement
     */
    useCase: string;
    /**
     * Limit of users for the entitlement
     */
    userLimit: number;
    /**
     * Flag to control if the entitlement should be shown in the consumption dashboard
     */
    shouldShowInConsumptionDashboard: boolean;
}

/**
 * Simplified version of a License's LicenseConnectorModel
 * Mostly used to list what's possible, compared to a license who will itself only list what's enabled
 */
export interface LicenseSourceTypeModel {
    /**
     * Type of Source, e.g.CATALOG, PUSH, WEB, SALESFORCE etc.
     */
    type: string;
}

/**
 * Request parameters when updating an organization's expiration date
 */
export interface LicenseExpirationDateOptions {
    /**
     * Expiration date in epoch in milliseconds, e.g. 1625518417000
     */
    expirationDate: number;
}

/**
 * Monitoring level determines the alerts raised when a problem is detected on an organization
 */
export enum LicenseMonitoringLevel {
    /**
     * The organization is completely ignored, no one will be alerted or try to save it if the search is down
     */
    NO_MONITORING = 'NO_MONITORING',
    /**
     * The organization is monitored but problems are raised as low level alerts
     * People on maintenance will try to fix the organization if they happen to look at the low-level alerting channels
     */
    BASIC_MONITORING = 'BASIC_MONITORING',
    /**
     * The organization is actively monitored and problems raise pagers that would wake up on-duty developers at night
     */
    REGULAR_MONITORING = 'REGULAR_MONITORING',
    /**
     * The organization is actively monitored with an aggressive schedule so any potential problem
     * is identified under a minute
     */
    STRATEGIC_MONITORING = 'STRATEGIC_MONITORING',
}

/**
 * Back-up type determines which index data is backed-up periodically
 */
export enum LicenseIndexBackType {
    /**
     * The organization's index is not backed-up. If the organization is deleted all the data must be crawled again.
     */
    NONE = 'NONE',
    /**
     * The organization's index is backed-up periodically. If the organization is deleted all the data can be restored.
     */
    REGULAR = 'REGULAR',
    /**
     * The organization's index is backed-up periodically. If the organization is deleted all the data can be restored.
     * Equivalent to REGULAR
     */
    FULL = 'FULL',
}

/**
 * Configurability level of ML models
 */
export enum LicenseMlModelConfigurability {
    /**
     * No advanced configurability available
     */
    NONE = 'NONE',
    /**
     * All advanced configurability options available
     */
    FULL = 'FULL',
}

/**
 * Usage analytics visualization levels
 */
export enum LicenseDataVisualizationAccessLevel {
    /**
     * Basic access
     */
    BASIC = 'BASIC',
}

/**
 * A machine learning models configuration that includes all available ML features.
 * Each feature has a model limit, enabled state, and optional build frequency.
 */
export interface LicenseMachineLearningModel {
    automaticRelevanceTuning: LicenseMachineLearningConfigurationModel;
    caseClassification: LicenseMachineLearningConfigurationModel;
    catalogSemanticEncoder: LicenseMachineLearningConfigurationModel;
    dynamicNavigationExperience: LicenseMachineLearningConfigurationModel;
    eventRecommendations: LicenseMachineLearningConfigurationModel;
    intentAwareProductRanking: LicenseMachineLearningConfigurationModel;
    ipxRecommendations: LicenseMachineLearningConfigurationModel;
    learningtoretrieve: LicenseMachineLearningConfigurationModel;
    passageRetrieval: LicenseMachineLearningConfigurationModel;
    predictiveQuerySuggestions: LicenseMachineLearningConfigurationModel;
    productRecommendations: LicenseMachineLearningConfigurationModel;
    querySuggestions: LicenseMachineLearningConfigurationModel;
    relevanceGenerativeAnswering: LicenseMachineLearningConfigurationModel;
    semanticEncoder: LicenseMachineLearningConfigurationModel;
    smartSnippets: LicenseMachineLearningConfigurationModel;
    testDeli: LicenseMachineLearningConfigurationModel;
}

/**
 * A machine learning feature configuration model.
 * @property numberOfModelsLimit - The maximum number of models allowed for this feature
 * @property enabled - Whether the feature is enabled for the organization
 * @property buildFrequency - Optional ISO 8601 duration string for model build frequency (e.g., "P7D" for 7 days)
 */
export interface LicenseMachineLearningConfigurationModel {
    numberOfModelsLimit: number;
    enabled: boolean;
    buildFrequency?: string;
}
