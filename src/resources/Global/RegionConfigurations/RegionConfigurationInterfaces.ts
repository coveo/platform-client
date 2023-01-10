import {RegionType} from '../../Enums.js';

export interface RegionConfigurationModel {
    apiEndpoint?: string;
    hostedSearchPagesEndpoint?: string;
    mainEndpoint?: string;
    region: string;
    regionEndpoint: string;
    regionName: string;
    regionType: RegionType;
}
