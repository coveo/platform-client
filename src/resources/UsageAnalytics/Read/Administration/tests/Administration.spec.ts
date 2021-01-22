import API from '../../../../../APICore';
import {RedshiftEndpointStatus} from '../../../../Enums';

import Administration from '../Administration';
import {AccountInfoModelV15} from '../AdministrationInterfaces';

jest.mock('../../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Administation', () => {
    let administation: Administration;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        administation = new Administration(api, serverlessApi);
    });

    describe('getAccount', () => {
        it('should make a get call to the Administration base url + /account', () => {
            administation.getAccount();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Administration.baseUrl}/account`);
        });
    });

    describe('getStrictValidationTest', () => {
        it('should make a get call to the Administration base url + /strictValidationTest', () => {
            administation.getStrictValidationTest({from: 'yyyy-mm-dd', to: 'yyyy-mm-dd', d: 'allo'});

            expect(api.get).toBeCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Administration.baseUrl}/account/strictValidationTest?from=yyyy-mm-dd&to=yyyy-mm-dd&d=allo`
            );
        });
    });

    describe('setRedshiftStatus', () => {
        it('should make a post call to the Administration base url + /redshift/endpoint/status', () => {
            administation.setRedshiftStatus('allo', RedshiftEndpointStatus.unavailable);

            expect(api.post).toHaveBeenCalledWith(
                `${Administration.baseUrl}/redshift/endpoint/status?endpointId=allo&status=UNAVAILABLE`
            );
        });
    });

    describe('updateAccount', () => {
        it('should make a put call to the Administration base url + /account', () => {
            const model: AccountInfoModelV15 = {
                internalEventIps: ['🍇', '👌', '🍷', '😵'],
                useStrictFieldValidation: true,
            };

            administation.updateAccount(model);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Administration.baseUrl}/account`, model);
        });
    });
});
