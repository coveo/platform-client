import API from '../../../../APICore.js';
import {DefaultGroupModel} from '../../GroupsInterfaces.js';
import BuiltInGroups from '../BuiltInGroups.js';

describe('BuiltInGroups.list', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('substitutes the organization ID and returns the deserialized built-in groups', async () => {
        const builtInGroups: DefaultGroupModel[] = [
            {
                id: 'built-in-group-id',
                deletable: false,
                displayName: 'Built-in group',
                privileges: [
                    {
                        owner: 'PLATFORM',
                        targetDomain: 'SOURCE',
                        level: 'VIEW_ALL',
                    },
                ],
                groupType: 'CUSTOM',
            },
        ];

        fetchMock.mockResponseOnce(JSON.stringify(builtInGroups));
        const api = new API({
            accessToken: 'some-token',
            host: 'https://platform.example.com',
            organizationId: 'organization-id',
        });
        const builtIn = new BuiltInGroups(api, api);

        const result = await builtIn.list();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            'https://platform.example.com/rest/organizations/organization-id/defaultgroups',
            expect.objectContaining({method: 'GET'}),
        );
        expect(result).toEqual(builtInGroups);
    });

    it('makes a GET call to the built-in groups URL', async () => {
        const api = new API({accessToken: 'some-token'});
        const get = jest.spyOn(api, 'get').mockResolvedValue([]);
        const builtIn = new BuiltInGroups(api, api);

        await builtIn.list();

        expect(get).toHaveBeenCalledTimes(1);
        expect(get).toHaveBeenCalledWith(BuiltInGroups.baseUrl);
    });
});
