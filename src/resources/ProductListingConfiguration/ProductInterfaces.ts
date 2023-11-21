import {Paginated} from '../BaseInterfaces.js';
import {RankingTypeEnum} from '../Enums.js';
import {MatchingConfigurationModel, RulesModel} from './ProductListingConfigurationInterfaces.js';

export interface ListingPreviewRequestModel {
    /**
     * Possible pattern matching values associated to a listing configuration.
     */
    matching: MatchingConfigurationModel;
    /**
     * Listing rules to apply at query time.
     */
    rules: RulesModel;
    /**
     * Contextual pagination information about the query.
     */
    pagination: Paginated;
    /**
     * Temporary way to specify catalog; overrides trackingId. TODO: use trackingId.
     */
    catalog?: {
        id: string;
        sourceName: string;
    };
}

export interface PaginationResultModel {
    /**
     * The number of elements.
     */
    totalCount: number;
}

export interface ProductListingIdentityModel {
    /**
     * Associated catalog id.
     */
    catalogId: string;
    /**
     * The product listing unique id.
     */
    id: string;
}

export interface ProductModel {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    additionalFields: Map<string, any>;
    childResults: ProductModel[];
    clickUri: string;
    ec_brand: string;
    ec_category: string[];
    ec_cogs: number;
    ec_description: string;
    ec_images: string[];
    ec_in_stock: boolean;
    ec_item_group_id: string;
    ec_name: string;
    ec_price: number;
    ec_promo_price: number;
    ec_rating: number;
    ec_shortdesc: string;
    ec_thumbnails: string[];
    permanentid: string;
    totalNumberOfChildResults: number;
}

export interface PreviewProductModel extends ProductModel {
    positionDifference: number;
    score: number;
    scoreDifference: number;
    scoreDetails: ScoreDetailsModel;
}

export interface ScoreDetailsModel {
    advancedRelevanceModelScore: number;
    rankingRules: RankingRuleModel[];
}

export interface RankingRuleModel {
    expression: string;
    score: number;
    type: RankingTypeEnum;
}

export interface PreviewResultModel {
    /**
     * The subset of products returned by the query.
     */
    products: PreviewProductModel[];
    /**
     * The number of total elements returned.
     */
    pagination: PaginationResultModel;
}
