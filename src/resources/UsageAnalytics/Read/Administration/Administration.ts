import {RedshiftEndpointStatus} from '../../../Enums';
import Resource from '../../../Resource';
import {
    AccountInfoModelV15,
    AccountResponseV15,
    StrictValidationTestParams,
    StrictValidationTestResponseV15,
} from './AdministrationInterfaces';

export default class Administration extends Resource {
    static baseUrl = '/rest/ua/v15/admin';

    getAccount() {
        return this.api.get<AccountResponseV15>(`${Administration.baseUrl}/account`);
    }

    updateAccount(model: AccountInfoModelV15) {
        return this.api.put<AccountResponseV15>(`${Administration.baseUrl}/account`, model);
    }

    setRedshiftStatus(endpoint: string, status: RedshiftEndpointStatus) {
        return this.api.post<Record<string, unknown>>(
            this.buildPath(`${Administration.baseUrl}/redshift/endpoint/status`, {endpointId: endpoint, status})
        );
    }

    getStrictValidationTest(params: StrictValidationTestParams) {
        return this.api.get<StrictValidationTestResponseV15>(
            this.buildPath(`${Administration.baseUrl}/account/strictValidationTest`, {
                ...params,
                org: this.api.organizationId,
            })
        );
    }
}
