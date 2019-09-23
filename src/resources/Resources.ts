import API from '../APICore';
import PlatformClient from '../PlatformClient';
import Catalog from './Catalogs/Catalog';

const resourcesMap = [{key: 'catalog', resource: Catalog}];

export class PlatformResources {
    catalog: Catalog;
}

const registerAll = (platform: PlatformClient, api: API) => {
    resourcesMap.forEach(({key, resource}) => {
        platform[key] = new resource(api);
    });
};

export const Resources = {
    registerAll,
};
