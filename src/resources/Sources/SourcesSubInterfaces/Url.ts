import {UrlFilterType} from '../../Enums';

export interface UrlFilter {
    filter?: string;
    filterType?: UrlFilterType;
    includeFilter?: boolean;
}
