import Catalog from '../Catalogs/Catalog';
import PlatformResources from '../PlatformResources';

describe('PlatformResources', () => {
    describe('registerAll', () => {
        it('should register the catalog resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.catalog).toBeDefined();
            expect(platformResources.catalog).toBeInstanceOf(Catalog);
        });
    });
});
