export interface OrganizationMonitoringEndpointUsageDetailsModel {
    /**
     * The percentage of requests, between 0 and 100, that go through the endpoint
     */
    totalRequestPercentage: number;
}

export interface OrganizationMonitoringEndpointUsageModel {
    /**
     * The organization's ID
     */
    organizationId: string;

    /**
     * The customer's analytics endpoint usage details (${organizationId}.analytics.org.coveo.com)
     */
    analyticsDetails: OrganizationMonitoringEndpointUsageDetailsModel;

    /**
     * The customer's search endpoint usage details (${organizationId}.org.coveo.com)
     */
    searchDetails: OrganizationMonitoringEndpointUsageDetailsModel;
}
