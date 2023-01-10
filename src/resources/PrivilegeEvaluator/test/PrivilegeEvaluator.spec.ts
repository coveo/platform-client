import API from '../../../APICore.js';
import PrivilegeEvaluator from '../PrivilegeEvaluator.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('PrivilegeEvaluator', () => {
    let privilegeEvaluator: PrivilegeEvaluator;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

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

        it('should make a post call to the Privilege Evaluator correct url with its params to evaluate a privilege', () => {
            privilegeEvaluator.evaluate(privilegeEvaluatorParams);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${PrivilegeEvaluator.baseUrl}`, privilegeEvaluatorParams);
        });
    });
});
