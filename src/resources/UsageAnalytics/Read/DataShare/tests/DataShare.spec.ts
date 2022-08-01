import API from '../../../../../APICore';
import DataShare from '../DataShare';

jest.mock('../../../../../APICore');

describe('Dimensions', () => {
    let dataShare: DataShare;
    const dataShareParams = {
        accountLocator: 'Soubane',
        snowflakeRegion: 'LOUBAME',
    };
    const api = jest.mocked(new API(null, null), true);
    Object.defineProperty(api, 'organizationId', {get: () => 'someOrgId'});
    beforeEach(() => {
        jest.clearAllMocks();
        dataShare = new DataShare(api, null);
    });

    describe('listSnowflakeAccount', () => {
        it('should make a GET call to the snowflake data share accounts url', () => {
            dataShare.listSnowflakeAccount();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DataShare.baseUrl}/accounts?org=someOrgId`);
        });
    });

    describe('addSnowflakeAccount', () => {
        it('should make a POST call to the snowflake data share accounts url', () => {
            dataShare.addSnowflakeAccount(dataShareParams);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DataShare.baseUrl}/accounts?org=someOrgId`, dataShareParams);
        });
    });

    describe('deleteSnowflakeAccount', () => {
        it('should make a DELETE call to the snowflake data share accounts url', () => {
            dataShare.deleteSnowflakeAccount(dataShareParams);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${DataShare.baseUrl}/accounts?accountLocator=Soubane&snowflakeRegion=LOUBAME&org=someOrgId`
            );
        });
    });

    describe('listAllowedSnowflakeRegions', () => {
        it('should make a GET call to the snowflake data share regions url', () => {
            dataShare.listAllowedSnowflakeRegions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DataShare.baseUrl}/regions?org=someOrgId`);
        });
    });
});