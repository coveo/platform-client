import API from '../../APICore';
import {PageModel} from '../BaseInterfaces';
import {CatalogModel, CatalogsListOptions, NewCatalogModel} from './Interfaces';

export default class Catalog {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogs`;

    constructor(private api: API) {}

    list(options?: CatalogsListOptions) {
        return this.api.get<PageModel<CatalogModel>>(Catalog.baseUrl, options);
    }

    create(catalog: NewCatalogModel) {
        return this.api.post<CatalogModel>(Catalog.baseUrl, catalog);
    }

    delete(catalogId: string) {
        return this.api.delete(`${Catalog.baseUrl}/${catalogId}`);
    }

    get(catalogId: string) {
        return this.api.get<CatalogModel>(`${Catalog.baseUrl}/${catalogId}`);
    }

    update(catalog: CatalogModel) {
        return this.api.put<CatalogModel>(`${Catalog.baseUrl}/${catalog.id}`, catalog);
    }
}
