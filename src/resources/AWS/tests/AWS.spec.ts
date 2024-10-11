import API from '../../../APICore.js';
import AWS from '../AWS.js';

jest.mock('../../../APICore.js');

describe('Cluster', () => {
    let aws: AWS;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        aws = new AWS(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Cluster base url', async () => {
            await aws.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(AWS.baseUrl);
        });
    });
});
