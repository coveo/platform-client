import {Paginated} from '../resources';
import {UnrecommendedPaginated} from '../resources/InternalBaseInterface';

export const normalizePaginatedOptions = (options: Paginated | UnrecommendedPaginated): UnrecommendedPaginated => {
    if (isUnrecommendedPaginatedOptions(options)) {
        return options;
    } else {
        const {perPage, ...copiedOptions} = {...options, pageSize: options.perPage};
        return copiedOptions;
    }
};

const isUnrecommendedPaginatedOptions = (options: any): options is UnrecommendedPaginated => {
    const keys = Object.keys(options);
    if (!keys.includes('perPage')) {
        return true;
    }
    if (keys.includes('pageSize')) {
        throw new Error(
            'The Pagination options are invalid: both pageSize and perPage have been set. Use only one of them.'
        );
    }
    return false;
};
