import API from '../../../APICore';
import SearchPages from '../SearchPages';
import {CreateSearchPageModel, UpdateSearchPageModel, MajorMinorVersion} from '../SearchPagesInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('SearchPages', () => {
    let searchPageService: SearchPages;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        searchPageService = new SearchPages(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific Search Pages url', () => {
            searchPageService.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchPages.baseUrl}`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the Search Pages base url', () => {
            const searchPageModel: CreateSearchPageModel = {name: 'test-name', title: 'test-title'};

            searchPageService.create(searchPageModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SearchPages.baseUrl, searchPageModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Search Pages url', () => {
            const searchPageId = '🐱';

            searchPageService.delete(searchPageId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${searchPageId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Search Pages url', () => {
            const searchPageId = '😽';

            searchPageService.get(searchPageId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${searchPageId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Search Pages url', () => {
            const searchPageId = '🙀';
            const searchPageModel: UpdateSearchPageModel = {name: 'test-name', title: 'test-title'};

            searchPageService.update(searchPageId, searchPageModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${searchPageId}`, searchPageModel);
        });
    });

    describe('getVersion', () => {
        it('should make a GET call to the specific Search UI url', () => {
            const searchPageId = '😽';

            searchPageService.getVersion(searchPageId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${searchPageId}/searchui`);
        });
    });

    describe('updateVersion', () => {
        it('should make a PUT call to the specific Search UI url', () => {
            const searchPageId = '🙀';
            const versionOptions: MajorMinorVersion = {major: 'bleep', minor: 'bloop'};

            searchPageService.updateVersion(searchPageId, versionOptions);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${SearchPages.baseUrl}/${searchPageId}/searchui?major=${versionOptions.major}&minor=${versionOptions.minor}`
            );
        });
    });
});
