import API from '../../../APICore.js';
import {New} from '../../../Entry.js';
import HostedPages from '../HostedPages.js';
import {HostedPage} from '../HostedPages.model.js';
jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('HostedPages', () => {
    let hostedPages: HostedPages;

    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
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
        it('should make a GET call with all parameters', () => {
            hostedPages.list({page: 2, perPage: 10, filter: 'Accounting', order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${HostedPages.baseUrl}?page=2&perPage=10&filter=Accounting&order=asc`
            );
        });

        it('should make a GET call with page', () => {
            hostedPages.list({page: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${HostedPages.baseUrl}?page=2`);
        });

        it('should make a GET call with perPage', () => {
            hostedPages.list({perPage: 10});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${HostedPages.baseUrl}?perPage=10`);
        });

        it('should make a GET call with filter', () => {
            hostedPages.list({filter: 'Accounting'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${HostedPages.baseUrl}?filter=Accounting`);
        });

        it('should make a GET call with order', () => {
            hostedPages.list({order: 'asc'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${HostedPages.baseUrl}?order=asc`);
        });
    });

    describe('create', () => {
        it('should make a POST call to the HostedPages base url', () => {
            hostedPages.create(hostedPage);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(HostedPages.baseUrl, hostedPage);
        });
    });

    describe('get', () => {
        it('should make a GET call to the HostedPages base url', () => {
            const id = 'HostedPage-id-to-get';

            hostedPages.get(id);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${HostedPages.baseUrl}/${id}`);
        });
    });

    describe('update', () => {
        it('should make an UPDATE call to the HostedPages base url', () => {
            const id = 'HostedPage-id-to-update';

            hostedPages.update({...hostedPage, id});

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${HostedPages.baseUrl}/${id}`, hostedPage);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the InsightPanelInterface base url', () => {
            const id = 'HostedPage-id-to-delete';

            hostedPages.delete(id);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${HostedPages.baseUrl}/${id}`);
        });
    });
});
