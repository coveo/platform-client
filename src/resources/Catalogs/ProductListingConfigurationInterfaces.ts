import {QueryFilterModel} from './ProductListingInterfaces';

export interface ProductListingConfigurationModel {
    /**
     * The list of RankingConfiguration.
     */
    rankingConfigurations: RankingConfiguration[];
}

export interface RankingConfiguration {
    /**
     * The list of inclusion filters.
     */
    include: QueryFilterModel[];
    /**
     * The list of exclusion filters.
     */
    exclude: QueryFilterModel[];
    /**
     * The type of the RankingConfiguration.
     */
    type: RankingTypeEnum;
    /**
     * The modifier value if type is BOOST or BURY. The index value if type is PIN.
     */
    value: number;
}

export enum RankingTypeEnum {
    BOOST = 'BOOST',
    BURY = 'BURY',
    PIN = 'PIN',
}
