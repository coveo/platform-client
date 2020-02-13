export interface TableauModel {
    name: string;
    contentUrl: string;
    authenticatedUrl: string;
    dashboard: DashboardModel;
}

export interface DashboardModel {
    name: string;
    description: string;
    contentUrl: string;
}
