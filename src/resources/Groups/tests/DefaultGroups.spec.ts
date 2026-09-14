import API from '../../../APICore.js';
import Group from '../Groups.js';
import {DefaultGroupModel} from '../GroupsInterfaces.js';

describe('Group.listDefaultGroups', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('substitutes the organization ID and returns the deserialized default-group templates', async () => {
        const defaultGroups: DefaultGroupModel[] = [
            {
                id: 'default-group-template-id',
                deletable: false,
                displayName: 'Default group template',
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

        fetchMock.mockResponseOnce(JSON.stringify(defaultGroups));
        const api = new API({
            accessToken: 'some-token',
            host: 'https://platform.example.com',
            organizationId: 'organization-id',
        });
        const group = new Group(api, api);

        const result = await group.listDefaultGroups();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(
            'https://platform.example.com/rest/organizations/organization-id/defaultgroups',
            expect.objectContaining({method: 'GET'}),
        );
        expect(result).toEqual(defaultGroups);
    });
});
