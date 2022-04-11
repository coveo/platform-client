import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {
    CachedCatalogFieldsModel,
    CachedCatalogFieldStatsModel,
    CatalogFieldsOptions,
    CatalogFieldStatsOptions,
    CatalogModel,
    CatalogsListOptions,
    CreateCatalogModel,
    FieldsSuggestionsModel,
    FieldsSuggestionsQueryModel,
} from './CatalogInterfaces';

export default class Catalog extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogs`;

    list(options?: CatalogsListOptions) {
        return this.api.get<PageModel<CatalogModel>>(this.buildPath(Catalog.baseUrl, options));
    }

    create(catalog: New<CreateCatalogModel>) {
        return this.api.post<CreateCatalogModel>(Catalog.baseUrl, catalog);
    }

    delete(catalogId: string) {
        return this.api.delete(`${Catalog.baseUrl}/${catalogId}`);
    }

    get(catalogId: string) {
        return this.api.get<CatalogModel>(`${Catalog.baseUrl}/${catalogId}`);
    }

    /**
     * @deprecated getFields(catalogId: string, options?: CatalogFieldsOptions) is kept for backward compatibility, you should now use `getFieldStats(catalogId: string, options?: CatalogFieldStatsOptions)`.
     */
    getFields(catalogId: string, options?: CatalogFieldsOptions) {
        return this.api.get<CachedCatalogFieldsModel>(
            this.buildPath(`${Catalog.baseUrl}/${catalogId}/fields`, options)
        );
    }

    /* eslint-disable @typescript-eslint/unified-signatures */
    update(catalog: CreateCatalogModel);
    /**
     * @deprecated `update(catalog: CatalogModel) is kept for backward compatibility, you should now use `update(catalog: CreateCatalogModel)`.
     */
    update(catalog: CatalogModel);
    update(catalog: CreateCatalogModel | CatalogModel) {
        return this.api.put<CreateCatalogModel>(`${Catalog.baseUrl}/${catalog.id}`, catalog);
    }
    /* eslint-enable @typescript-eslint/unified-signatures */

    getFieldsSuggestions(query: FieldsSuggestionsQueryModel) {
        return this.api.post<FieldsSuggestionsModel>(`${Catalog.baseUrl}/fieldsSuggestions`, query);
    }

    getFieldStats(catalogId: string, options?: CatalogFieldStatsOptions) {
        return this.api.get<CachedCatalogFieldStatsModel>(
            this.buildPath(`${Catalog.baseUrl}/${catalogId}/fieldStats`, options)
        );
    }
}
