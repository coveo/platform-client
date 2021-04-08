import API from '../../../APICore';
import SearchPages from '../SearchPages';
import {
    CreateSearchPageModel,
    UpdateSearchPageModel,
    MajorMinorVersion,
    CSSResourceModel,
    ReorderSearchPageHeadersModel,
    JavaScriptResourceModel,
} from '../SearchPagesInterfaces';

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

    describe('headers', () => {
        const searchPageId = '00000000-0000-0000-0000-000000000000';
        describe('all', () => {
            describe('get', () => {
                it('should make a GET call to the specific Search Pages headers url', () => {
                    searchPageService.getHeaders(searchPageId);
                    expect(api.get).toHaveBeenCalledTimes(1);
                    expect(api.get).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${searchPageId}/header`);
                });
            });

            describe('reorder', () => {
                it('should make a PUT call to the specific Search Pages headers url', () => {
                    const reorderHeaderModel: ReorderSearchPageHeadersModel = {
                        css: ['👾', '🧟', '🤡'],
                        javascript: ['👻', '💀', '👽'],
                    };

                    searchPageService.reorderHeaders(searchPageId, reorderHeaderModel);
                    expect(api.put).toHaveBeenCalledTimes(1);
                    expect(api.put).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header`,
                        reorderHeaderModel
                    );
                });
            });
        });
        describe('css', () => {
            describe('create', () => {
                it('should make a POST call to the Search Pages CSS resource url', () => {
                    const cssResourceModel: CSSResourceModel = {
                        inlineContent: 'body { color: #e0e0e0; background-color: #2a2aa2; }',
                        name: '👹',
                        url: 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css',
                    };

                    searchPageService.createCssResource(searchPageId, cssResourceModel);
                    expect(api.post).toHaveBeenCalledTimes(1);
                    expect(api.post).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/css`,
                        cssResourceModel
                    );
                });
            });

            describe('delete', () => {
                it('should make a DELETE call to the specific Search Pages CSS resource url', () => {
                    const resourceName = '👹';
                    searchPageService.deleteCssResource(searchPageId, resourceName);
                    expect(api.delete).toHaveBeenCalledTimes(1);
                    expect(api.delete).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/css/${resourceName}`
                    );
                });
            });

            describe('update', () => {
                it('should make a PUT call to the specific Search Pages CSS resource url', () => {
                    const resourceName = '👹';
                    const cssResourceModel: CSSResourceModel = {
                        inlineContent: 'body { color: #e0e0e0; background-color: #2a2aa2; }',
                        name: resourceName,
                        url: 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css',
                    };

                    searchPageService.updateCssResource(searchPageId, resourceName, cssResourceModel);
                    expect(api.put).toHaveBeenCalledTimes(1);
                    expect(api.put).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/css/${resourceName}`,
                        cssResourceModel
                    );
                });
            });
        });
        describe('javascript', () => {
            describe('create', () => {
                it('should make a POST call to the Search Pages JS resource url', () => {
                    const jsResourceModel: JavaScriptResourceModel = {
                        inlineContent: "window.location = 'about:blank';",
                        name: '👺',
                        url: 'https://code.jquery.com/jquery-3.4.1.min.js',
                    };

                    searchPageService.createJsResource(searchPageId, jsResourceModel);
                    expect(api.post).toHaveBeenCalledTimes(1);
                    expect(api.post).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/javascript`,
                        jsResourceModel
                    );
                });
            });

            describe('delete', () => {
                it('should make a DELETE call to the specific Search Pages JS resource url', () => {
                    const resourceName = '👺';
                    searchPageService.deleteJsResource(searchPageId, resourceName);
                    expect(api.delete).toHaveBeenCalledTimes(1);
                    expect(api.delete).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/javascript/${resourceName}`
                    );
                });
            });

            describe('update', () => {
                it('should make a PUT call to the specific Search Pages JS resource url', () => {
                    const resourceName = '👺';
                    const jsResourceModel: JavaScriptResourceModel = {
                        inlineContent: "window.location = 'about:blank';",
                        name: '👺',
                        url: 'https://code.jquery.com/jquery-3.4.1.min.js',
                    };

                    searchPageService.updateJsResource(searchPageId, resourceName, jsResourceModel);
                    expect(api.put).toHaveBeenCalledTimes(1);
                    expect(api.put).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/javascript/${resourceName}`,
                        jsResourceModel
                    );
                });
            });
        });
    });
});
