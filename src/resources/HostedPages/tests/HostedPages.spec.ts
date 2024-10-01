import API from '../../../APICore.js';
import {New} from '../../../Entry.js';
import HostedPages from '../HostedPages.js';
import {HostedPage} from '../HostedPages.model.js';
jest.mock('../../../APICore.js');

describe('HostedPages', () => {
    let hostedPages: HostedPages;

    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const hostedPage: New<HostedPage> = {
        name: 'my new page1',
        html: '<atomic-search-interface></atomic-search-interface>',
        javascript: [
            {
                isModule: true,
                inlineContent: 'console.log("hello world")',
            },
            {
                isModule: false,
                url: 'https://static.cloud.coveo.com/atomic/v2/atomic.esm.js',
            },
        ],
        css: [
            {inlineContent: 'body { margin: 10px;}'},
            {url: 'https://static.cloud.coveo.com/atomic/v2/themes/coveo.css'},
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        hostedPages = new HostedPages(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call with all parameters', async () => {
            await hostedPages.list({page: 2, perPage: 10, filter: 'Accounting', order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${HostedPages.baseUrl}?page=2&perPage=10&filter=Accounting&order=asc`,
            );
        });

        it('should make a GET call with page', async () => {
            await hostedPages.list({page: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${HostedPages.baseUrl}?page=2`);
        });

        it('should make a GET call with perPage', async () => {
            await hostedPages.list({perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${HostedPages.baseUrl}?perPage=10`);
        });

        it('should make a GET call with filter', async () => {
            await hostedPages.list({filter: 'Accounting'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${HostedPages.baseUrl}?filter=Accounting`);
        });

        it('should make a GET call with order', async () => {
            await hostedPages.list({order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${HostedPages.baseUrl}?order=asc`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the HostedPages base url', async () => {
            await hostedPages.create(hostedPage);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(HostedPages.baseUrl, hostedPage);
        });
    });

    describe('get', () => {
        it('should make a GET call to the HostedPages base url', async () => {
            const id = 'HostedPage-id-to-get';

            await hostedPages.get(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${HostedPages.baseUrl}/${id}`);
        });
    });

    describe('update', () => {
        it('should make an UPDATE call to the HostedPages base url', async () => {
            const id = 'HostedPage-id-to-update';

            await hostedPages.update({...hostedPage, id});

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${HostedPages.baseUrl}/${id}`, hostedPage);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the InsightPanelInterface base url', async () => {
            const id = 'HostedPage-id-to-delete';

            await hostedPages.delete(id);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${HostedPages.baseUrl}/${id}`);
        });
    });
});
