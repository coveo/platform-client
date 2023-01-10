import {UrlFilterType} from '../../Enums.js';

export interface UrlFilter {
    filter?: string;
    filterType?: UrlFilterType;
    includeFilter?: boolean;
}
