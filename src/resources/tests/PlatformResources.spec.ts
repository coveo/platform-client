import Catalog from '../Catalogs/Catalog';
import Group from '../Groups/Groups';
import PlatformResources from '../PlatformResources';

describe('PlatformResources', () => {
    describe('registerAll', () => {
        it('should register the catalog resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.catalog).toBeDefined();
            expect(platformResources.catalog).toBeInstanceOf(Catalog);
        });

        it('should register the group resource on the platform instance', () => {
            const platformResources = new PlatformResources();
            platformResources.registerAll();

            expect(platformResources.group).toBeDefined();
            expect(platformResources.group).toBeInstanceOf(Group);
        });
    });
});
