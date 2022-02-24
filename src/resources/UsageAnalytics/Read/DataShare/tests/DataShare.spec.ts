import API from '../../../../../APICore';
import DataShare from '../DataShare';

jest.mock('../../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Dimensions', () => {
    let dataShare: DataShare;
    const dataShareParams = {
        accountLocator: 'Soubane',
        snowflakeRegion: 'LOUBAME',
    };
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        dataShare = new DataShare(api, serverlessApi);
    });

    describe('listSnowflakeAccount', () => {
        it('should make a GET call to the snowflake data share accounts url', () => {
            dataShare.listSnowflakeAccount();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DataShare.baseUrl}/accounts`);
        });
    });

    describe('addSnowflakeAccount', () => {
        it('should make a POST call to the snowflake data share accounts url', () => {
            dataShare.addSnowflakeAccount(dataShareParams);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${DataShare.baseUrl}/accounts`, dataShareParams);
        });
    });

    describe('deleteSnowflakeAccount', () => {
        it('should make a DELETE call to the snowflake data share accounts url', () => {
            dataShare.deleteSnowflakeAccount(dataShareParams);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${DataShare.baseUrl}/accounts?accountLocator=Soubane&snowflakeRegion=LOUBAME`
            );
        });
    });

    describe('listAllowedSnowflakeRegions', () => {
        it('should make a GET call to the snowflake data share regions url', () => {
            dataShare.listAllowedSnowflakeRegions();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${DataShare.baseUrl}/regions`);
        });
    });
});
