import API from '../../APICore';
import PlatformClient from '../../PlatformClient';
import Catalog from '../Catalogs/Catalog';
import {Resources} from '../Resources';

describe('Resources', () => {
    describe('registerAll', () => {
        let platform: PlatformClient;
        let api: API;

        beforeEach(() => {
            platform = {} as PlatformClient;
            api = {} as API;
        });

        it('should register the catalog resource on the platform instance', () => {
            Resources.registerAll(platform, api);

            expect(platform.catalog).toBeDefined();
            expect(platform.catalog).toBeInstanceOf(Catalog);
        });
    });
});
