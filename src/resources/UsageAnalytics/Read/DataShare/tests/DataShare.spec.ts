import API from '../../../../../APICore.js';
import DataShare from '../DataShare.js';

jest.mock('../../../../../APICore.js');

describe('DataShare', () => {
    let dataShare: DataShare;
    const dataShareParams = {
        accountLocator: 'Soubane',
        snowflakeRegion: 'LOUBAME',
    };
    const api = jest.mocked(new API({accessToken: '🔑'}));
    const serverlessApi = jest.mocked(new API({accessToken: '🔑'}, true));
    Object.defineProperty(api, 'organizationId', {get: () => 'someOrgId'});
    beforeEach(() => {
        jest.clearAllMocks();
        dataShare = new DataShare(api, serverlessApi);
    });

    describe('listSnowflakeAccount', () => {
        it('should make a GET call to the snowflake data share accounts url', async () => {
            await dataShare.listSnowflakeAccount();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DataShare.baseUrl}/accounts?org=someOrgId`);
        });
    });

    describe('addSnowflakeAccount', () => {
        it('should make a POST call to the snowflake data share accounts url', async () => {
            await dataShare.addSnowflakeAccount(dataShareParams);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DataShare.baseUrl}/accounts?org=someOrgId`, dataShareParams);
        });
    });

    describe('deleteSnowflakeAccount', () => {
        it('should make a DELETE call to the snowflake data share accounts url', async () => {
            await dataShare.deleteSnowflakeAccount(dataShareParams);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${DataShare.baseUrl}/accounts?org=someOrgId&accountLocator=Soubane&snowflakeRegion=LOUBAME`,
            );
        });
    });

    describe('listAllowedSnowflakeRegions', () => {
        it('should make a GET call to the snowflake data share regions url', async () => {
            await dataShare.listAllowedSnowflakeRegions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DataShare.baseUrl}/regions?org=someOrgId`);
        });
    });
});
