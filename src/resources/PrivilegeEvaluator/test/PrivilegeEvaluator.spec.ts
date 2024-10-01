import API from '../../../APICore.js';
import PrivilegeEvaluator from '../PrivilegeEvaluator.js';

jest.mock('../../../APICore.js');

describe('PrivilegeEvaluator', () => {
    let privilegeEvaluator: PrivilegeEvaluator;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        privilegeEvaluator = new PrivilegeEvaluator(api, serverlessApi);
    });

    describe('evaluate', () => {
        const privilegeEvaluatorParams = {
            organizationId: 'some-coveo-platform-organization-id',
            requestedPrivilege: {
                owner: 'SEARCH_API',
                targetDomain: 'IMPERSONATE',
                targetId: '*',
            },
        };

        it('should make a post call to the Privilege Evaluator correct url with its params to evaluate a privilege', async () => {
            await privilegeEvaluator.evaluate(privilegeEvaluatorParams);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${PrivilegeEvaluator.baseUrl}`, privilegeEvaluatorParams);
        });
    });
});
