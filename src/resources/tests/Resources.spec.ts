import API from '../../APICore';
import CoveoPlatform from '../../CoveoPlatform';
import Catalog from '../Catalogs/Catalog';
import {Resources} from '../Resources';

describe('Resources', () => {
    describe('registerAll', () => {
        let platform: CoveoPlatform;
        let api: API;

        beforeEach(() => {
            platform = {} as CoveoPlatform;
            api = {} as API;
        });

        it('should register the catalog resource on the platform instance', () => {
            Resources.registerAll(platform, api);

            expect(platform.catalog).toBeDefined();
            expect(platform.catalog).toBeInstanceOf(Catalog);
        });
    });
});
