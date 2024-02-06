import API from '../../../../APICore.js';
import {AuthProvider} from '../../../Enums.js';
import Members from '../Members.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Members', () => {
    let members: Members;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        members = new Members(api, serverlessApi);
    });

    describe('getAll', () => {
        it('makes a GET call to the specific members url', () => {
            members.getAll();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Members.baseUrl);
        });
    });

    describe('delete', () => {
        it('make a DELETE call to the specific member url', () => {
            members.delete('Gael');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Members.baseUrl}/Gael`);
        });
    });

    describe('get', () => {
        it('make a GET call to check a specific member in an Organization', () => {
            members.get('Gael');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Members.baseUrl}/Gael`);
        });
    });

    describe('getPrivileges', () => {
        it('makes a GET call to check the privileges the user has in the organization', () => {
            members.getPrivileges();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Members.baseUrl}/privileges`);
        });
    });

    describe('updateOrganizationMembers', () => {
        it('makes a PUT call to update members of an organization', () => {
            members.updateOrganizationMembers([
                {
                    displayName: 'test',
                    email: 'test@gmail.com',
                    groups: [],
                    provider: AuthProvider.GOOGLE,
                    providerUsername: 'test',
                    username: 'tttest',
                },
            ]);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Members.baseUrl}`, [
                {
                    displayName: 'test',
                    email: 'test@gmail.com',
                    groups: [],
                    provider: 'GOOGLE',
                    providerUsername: 'test',
                    username: 'tttest',
                },
            ]);
        });
    });

    describe('updateMember', () => {
        it('makes a PUT call to update a member of an organization', () => {
            members.updateMember('gael', {
                displayName: 'test',
                email: 'test@gmail.com',
                groups: [],
                provider: AuthProvider.GOOGLE,
                providerUsername: 'test',
                username: 'tttest',
            });

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Members.baseUrl}/gael`, {
                displayName: 'test',
                email: 'test@gmail.com',
                groups: [],
                provider: 'GOOGLE',
                providerUsername: 'test',
                username: 'tttest',
            });
        });
    });

    describe('getGroups', () => {
        it('makes a GET call to lists the groups to which an organization member belongs', () => {
            members.getGroups('gael');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Members.baseUrl}/gael/groups`);
        });
    });
});
