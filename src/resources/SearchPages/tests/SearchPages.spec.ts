import API from '../../../APICore.js';
import SearchPages from '../SearchPages.js';
import {
    CreateSearchPageModel,
    UpdateSearchPageModel,
    MajorMinorVersion,
    CSSResourceModel,
    ReorderSearchPageHeadersModel,
    JavaScriptResourceModel,
} from '../SearchPagesInterfaces.js';

jest.mock('../../../APICore.js');

describe('SearchPages', () => {
    let searchPageService: SearchPages;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        searchPageService = new SearchPages(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the specific Search Pages url', async () => {
            await searchPageService.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchPages.baseUrl}`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the Search Pages base url', async () => {
            const searchPageModel: CreateSearchPageModel = {name: 'test-name', title: 'test-title'};

            await searchPageService.create(searchPageModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(SearchPages.baseUrl, searchPageModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Search Pages url', async () => {
            const searchPageId = '🐱';

            await searchPageService.delete(searchPageId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${searchPageId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Search Pages url', async () => {
            const searchPageId = '😽';

            await searchPageService.get(searchPageId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${searchPageId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Search Pages url', async () => {
            const searchPageId = '🙀';
            const searchPageModel: UpdateSearchPageModel = {name: 'test-name', title: 'test-title'};

            await searchPageService.update(searchPageId, searchPageModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${searchPageId}`, searchPageModel);
        });
    });

    describe('getVersion', () => {
        it('should make a GET call to the specific Search UI url', async () => {
            const searchPageId = '😽';

            await searchPageService.getVersion(searchPageId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${searchPageId}/searchui`);
        });
    });

    describe('updateVersion', () => {
        it('should make a PUT call to the specific Search UI url', async () => {
            const searchPageId = '🙀';
            const versionOptions: MajorMinorVersion = {major: 'bleep', minor: 'bloop'};

            await searchPageService.updateVersion(searchPageId, versionOptions);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${SearchPages.baseUrl}/${searchPageId}/searchui?major=${versionOptions.major}&minor=${versionOptions.minor}`,
            );
        });
    });

    describe('headers', () => {
        const searchPageId = '00000000-0000-0000-0000-000000000000';
        describe('all', () => {
            describe('get', () => {
                it('should make a GET call to the specific Search Pages headers url', async () => {
                    await searchPageService.getHeaders(searchPageId);
                    expect(api.get).toHaveBeenCalledTimes(1);
                    expect(api.get).toHaveBeenCalledWith(`${SearchPages.baseUrl}/${searchPageId}/header`);
                });
            });

            describe('reorder', () => {
                it('should make a PUT call to the specific Search Pages headers url', async () => {
                    const reorderHeaderModel: ReorderSearchPageHeadersModel = {
                        css: ['👾', '🧟', '🤡'],
                        javascript: ['👻', '💀', '👽'],
                    };

                    await searchPageService.reorderHeaders(searchPageId, reorderHeaderModel);
                    expect(api.put).toHaveBeenCalledTimes(1);
                    expect(api.put).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header`,
                        reorderHeaderModel,
                    );
                });
            });
        });
        describe('css', () => {
            describe('create', () => {
                it('should make a POST call to the Search Pages CSS resource url', async () => {
                    const cssResourceModel: CSSResourceModel = {
                        inlineContent: 'body { color: #e0e0e0; background-color: #2a2aa2; }',
                        name: '👹',
                        url: 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css',
                    };

                    await searchPageService.createCssResource(searchPageId, cssResourceModel);
                    expect(api.post).toHaveBeenCalledTimes(1);
                    expect(api.post).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/css`,
                        cssResourceModel,
                    );
                });
            });

            describe('delete', () => {
                it('should make a DELETE call to the specific Search Pages CSS resource url', async () => {
                    const resourceName = '👹';
                    await searchPageService.deleteCssResource(searchPageId, resourceName);
                    expect(api.delete).toHaveBeenCalledTimes(1);
                    expect(api.delete).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/css/${resourceName}`,
                    );
                });
            });

            describe('update', () => {
                it('should make a PUT call to the specific Search Pages CSS resource url', async () => {
                    const resourceName = '👹';
                    const cssResourceModel: CSSResourceModel = {
                        inlineContent: 'body { color: #e0e0e0; background-color: #2a2aa2; }',
                        name: resourceName,
                        url: 'https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css',
                    };

                    await searchPageService.updateCssResource(searchPageId, resourceName, cssResourceModel);
                    expect(api.put).toHaveBeenCalledTimes(1);
                    expect(api.put).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/css/${resourceName}`,
                        cssResourceModel,
                    );
                });
            });
        });
        describe('javascript', () => {
            describe('create', () => {
                it('should make a POST call to the Search Pages JS resource url', async () => {
                    const jsResourceModel: JavaScriptResourceModel = {
                        inlineContent: "window.location = 'about:blank';",
                        name: '👺',
                        url: 'https://code.jquery.com/jquery-3.4.1.min.js',
                    };

                    await searchPageService.createJsResource(searchPageId, jsResourceModel);
                    expect(api.post).toHaveBeenCalledTimes(1);
                    expect(api.post).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/javascript`,
                        jsResourceModel,
                    );
                });
            });

            describe('delete', () => {
                it('should make a DELETE call to the specific Search Pages JS resource url', async () => {
                    const resourceName = '👺';
                    await searchPageService.deleteJsResource(searchPageId, resourceName);
                    expect(api.delete).toHaveBeenCalledTimes(1);
                    expect(api.delete).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/javascript/${resourceName}`,
                    );
                });
            });

            describe('update', () => {
                it('should make a PUT call to the specific Search Pages JS resource url', async () => {
                    const resourceName = '👺';
                    const jsResourceModel: JavaScriptResourceModel = {
                        inlineContent: "window.location = 'about:blank';",
                        name: '👺',
                        url: 'https://code.jquery.com/jquery-3.4.1.min.js',
                    };

                    await searchPageService.updateJsResource(searchPageId, resourceName, jsResourceModel);
                    expect(api.put).toHaveBeenCalledTimes(1);
                    expect(api.put).toHaveBeenCalledWith(
                        `${SearchPages.baseUrl}/${searchPageId}/header/javascript/${resourceName}`,
                        jsResourceModel,
                    );
                });
            });
        });
    });
});
