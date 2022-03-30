export interface TableauReportParams {
    /**
     * The type of content of the dashboard. Can be either components, dashboards or datasources
     */
    contentType: string;
    /**
     * The organization Id
     */
    organizationId: string;
}

export interface TableauDashboardParams extends TableauReportParams {
    /**
     * The url of the report dashboard
     */
    dashboardContentUrl: string;
}

export interface TableauDashboardViewParams extends TableauDashboardParams {
    /**
     * The url of a specific view in the dashboard
     */
    viewContentUrl: string;
}

export interface TableauReportResponse {
    /**
     * The content url of the dashboard
     */
    contentUrl: string;
    /**
     * The description of the dashboard
     */
    description: string;
    /**
     * The name of the dashboard
     */
    name: string;
    /**
     * The last dashboard update
     */
    updatedAt: string;
}

export interface TableauDashboardResponse {
    /**
     * The authenticated url for embeding purpose
     */
    authenticatedUrl: string;
    /**
     * The content url of the dashboard
     */
    contentUrl: string;
    /**
     * The specific dashboard
     */
    dashboard: TableauReportResponse;
    /**
     * The name of the dashboard view
     */
    name: string;
}
