import {RegionType} from '../../Enums';

export interface RegionConfigurationModel {
    apiEndpoint?: string;
    hostedSearchPagesEndpoint?: string;
    mainEndpoint?: string;
    region: string;
    regionEndpoint: string;
    regionName: string;
    regionType: RegionType;
}
