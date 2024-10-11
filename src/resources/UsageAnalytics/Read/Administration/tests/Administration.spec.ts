import API from '../../../../../APICore.js';

import Administration from '../Administration.js';
import {AccountInfoModelV15} from '../AdministrationInterfaces.js';

jest.mock('../../../../../APICore.js');

describe('Administation', () => {
    let administation: Administration;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        administation = new Administration(api, serverlessApi);
    });

    describe('getAccount', () => {
        it('should make a get call to the Administration base url + /account', async () => {
            await administation.getAccount();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Administration.baseUrl}/account`);
        });
    });

    describe('getStrictValidationTest', () => {
        it('should make a get call to the Administration base url + /strictValidationTest', async () => {
            await administation.getStrictValidationTest({from: 'yyyy-mm-dd', to: 'yyyy-mm-dd', d: 'allo'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${Administration.baseUrl}/account/strictValidationTest?from=yyyy-mm-dd&to=yyyy-mm-dd&d=allo`,
            );
        });
    });

    describe('updateAccount', () => {
        it('should make a put call to the Administration base url + /account', async () => {
            const model: AccountInfoModelV15 = {
                internalEventIps: ['🍇', '👌', '🍷', '😵'],
                useStrictFieldValidation: true,
            };

            await administation.updateAccount(model);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Administration.baseUrl}/account`, model);
        });
    });
});
