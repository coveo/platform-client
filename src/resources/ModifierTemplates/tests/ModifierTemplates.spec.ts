import API from '../../../APICore.js';
import ModifierTemplates from '../ModifierTemplates.js';
import {} from '../ModifierTemplateInterfaces.js';

jest.mock('../../../APICore.js');

describe('OrganizationDefinitions', () => {
    let modifierTemplates: ModifierTemplates;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        modifierTemplates = new ModifierTemplates(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Modifier Templates url listing all existing templates', async () => {
            await modifierTemplates.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(ModifierTemplates.baseUrl);
        });
    });

    describe('listAvailableStatements', () => {
        it('should make a GET call to the Modifier Templates url listing all possible statements', async () => {
            await modifierTemplates.listPossibleStatements();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${ModifierTemplates.baseUrl}/statementdetails`);
        });
    });
});
