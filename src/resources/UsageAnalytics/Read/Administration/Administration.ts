import ReadServiceResource from '../ReadServiceResource.js';
import {
    AccountInfoModelV15,
    AccountResponseV15,
    StrictValidationTestParams,
    StrictValidationTestResponseV15,
} from './AdministrationInterfaces.js';

export default class Administration extends ReadServiceResource {
    static baseUrl = '/rest/ua/v15/admin';

    /**
     * Get an account.
     */
    getAccount() {
        return this.api.get<AccountResponseV15>(this.buildPathWithOrg(`${Administration.baseUrl}/account`));
    }

    /**
     * Edit an account.
     *
     * @param model The account information.
     */
    updateAccount(model: AccountInfoModelV15) {
        return this.api.put<AccountResponseV15>(this.buildPathWithOrg(`${Administration.baseUrl}/account`), model);
    }

    /**
     * Get example values that would be rejected by strict validation for the specified dimension.
     */
    getStrictValidationTest(params: StrictValidationTestParams) {
        return this.api.get<StrictValidationTestResponseV15>(
            this.buildPathWithOrg(`${Administration.baseUrl}/account/strictValidationTest`, params)
        );
    }
}
