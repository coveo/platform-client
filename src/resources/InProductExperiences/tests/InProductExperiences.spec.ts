import API from '../../../APICore';
import SearchPages from '../../SearchPages/SearchPages';
import InProductExperiences from '../InProductExperiences';
import {CreateInProductExperienceModel, UpdateInProductExperienceModel} from '../InProductExperiencesInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('InProductExperiences', () => {
    let ipxService: InProductExperiences;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        ipxService = new InProductExperiences(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific In-Product Experiences url', () => {
            ipxService.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InProductExperiences.ipxBaseUrl}s`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the In-Product Experiences base url', () => {
            const ipxModel: CreateInProductExperienceModel = {
                name: 'create-ipx-test',
                searchHub: 'IpxHub',
                title: 'Awesome Search',
            };

            ipxService.create(ipxModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(InProductExperiences.ipxBaseUrl, ipxModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Search Pages url', () => {
            const ipxId = '🐱';

            ipxService.delete(ipxId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${ipxId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific In-Product Experiences url', () => {
            const ipxId = '🙀';
            const ipxModel: UpdateInProductExperienceModel = {
                name: 'update-ipx-test',
                searchHub: 'IpxHub',
                title: 'Awesome Search',
            };

            ipxService.update(ipxId, ipxModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${InProductExperiences.ipxBaseUrl}/${ipxId}`, ipxModel);
        });
    });

    describe('get loader', () => {
        it('should make a GET call to the specific In-Product Experiences url for retrieving the loader script', () => {
            const ipxId = '🙀';

            ipxService.getLoader(ipxId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${InProductExperiences.baseUrl}/${ipxId}/inappwidget/loader`);
        });

        it('should make a GET call to the specific In-Product Experiences url for retrieving the loader script with a specific access token', () => {
            const ipxId = '🙀';
            const accessToken = 'a-fake-token';

            ipxService.getLoader(ipxId, accessToken);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${InProductExperiences.baseUrl}/${ipxId}/inappwidget/loader?access_token=${accessToken}`
            );
        });
    });

    describe('nested resources', () => {
        it('should front search pages', () => {
            expect(ipxService.searchPages).toBeDefined();
            expect(ipxService.searchPages).toBeInstanceOf(SearchPages);
        });
    });
});
