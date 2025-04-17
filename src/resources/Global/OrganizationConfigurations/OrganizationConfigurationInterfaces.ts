export interface OrganizationConfigurationModel {
    customDns?: string;
    mainRegions: string[];
    organizationId: string;
    satelliteRegions: string[];
    primaryMainRegion: string;
    distributedDns: string;
    adminDns: string;
    analyticsDns: string;
}
