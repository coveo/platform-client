import API from '../../APICore';

export interface CatalogsListOptions {
    page?: number;
    pageSize?: number;
}

interface PageModel<T> {
    items: T[];
    totalEntries: number;
    totalPages: number;
}

interface CatalogModel {
    availability?: AvailabilityHierarchyModel;
    description?: string;
    id?: string;
    name?: string;
    product?: ProductHierarchyModel;
    variant?: VariantHierarchyModel;
}

interface VariantHierarchyModel {
    fields: string[];
    idField: string;
    objectType: string;
}

interface ProductHierarchyModel {
    idField?: string;
    objectType?: string;
}

interface AvailabilityHierarchyModel {
    availableSkusField: string;
    fields: string[];
    objectType: string;
}

export default class Catalog {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogs`;

    constructor(private api: API) {}

    list(options?: CatalogsListOptions) {
        return this.api.get<PageModel<CatalogModel>>(Catalog.baseUrl, options);
    }

    create(catalog: CatalogModel) {
        return this.api.post<CatalogModel>(Catalog.baseUrl, catalog);
    }

    delete(catalogId: string) {
        return this.api.delete(`${Catalog.baseUrl}/${catalogId}`);
    }

    get(catalogId: string) {
        return this.api.get<CatalogModel>(`${Catalog.baseUrl}/${catalogId}`);
    }

    update(catalogId: string, catalog: CatalogModel) {
        return this.api.put<CatalogModel>(`${Catalog.baseUrl}/${catalogId}`, catalog);
    }
}
