import {QueryFilterModel} from './ProductListingInterfaces';

export interface ProductListingConfigurationModel {
    rankingConfigurations: rankingConfigurations[];
}

export interface rankingConfigurations {
    include: QueryFilterModel[];
    exclude: QueryFilterModel[];
    type: RankingTypeEnum;
    value: number;
}

export enum RankingTypeEnum {
    BOOST = 'BOOST',
    BURY = 'BURY',
    PIN = 'PIN',
}
