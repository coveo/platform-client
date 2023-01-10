import API from '../../../APICore.js';
import ModifierTemplates from '../ModifierTemplates.js';
import {} from '../ModifierTemplateInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('OrganizationDefinitions', () => {
    let modifierTemplates: ModifierTemplates;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        modifierTemplates = new ModifierTemplates(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Modifier Templates url listing all existing templates', () => {
            modifierTemplates.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ModifierTemplates.baseUrl);
        });
    });

    describe('listAvailableStatements', () => {
        it('should make a GET call to the Modifier Templates url listing all possible statements', () => {
            modifierTemplates.listPossibleStatements();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ModifierTemplates.baseUrl}/statementdetails`);
        });
    });
});
