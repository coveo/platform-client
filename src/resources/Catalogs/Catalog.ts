import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {CatalogModel, CatalogsListOptions} from './CatalogInterfaces';

export default class Catalog extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogs`;

    list(options?: CatalogsListOptions) {
        return this.api.get<PageModel<CatalogModel>>(this.buildPath(Catalog.baseUrl, options));
    }

    create(catalog: New<CatalogModel>) {
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
