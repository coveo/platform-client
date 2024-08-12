import {Paginated} from '../BaseInterfaces.js';
import {DeprecatedPaginated} from '../InternalBaseInterface.js';
import {QueryFilterModel} from './ProductListingInterfaces.js';

/**
 * @deprecated
 */
export type ProductListingConfigurationOptions = Paginated | DeprecatedPaginated;

/**
 * @deprecated
 */
export interface ProductListingConfigurationModel {
    /**
     * The id of the ProductListingConfiguration.
     */
    id: string;
    /**
     * The list of RankingConfiguration.
     */
    rankingConfigurations: RankingConfiguration[];
}

/**
 * @deprecated
 */
export interface RankingConfiguration {
    /**
     * The name of the RankingConfiguration.
     */
    name: string;
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

/**
 * @deprecated
 */
export enum RankingTypeEnum {
    BOOST = 'BOOST',
    BURY = 'BURY',
    PIN = 'PIN',
}
