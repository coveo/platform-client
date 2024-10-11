import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import GlobalGroup from '../GlobalGroup.js';
import {GlobalGroupModel} from '../GlobalGroupInterfaces.js';

jest.mock('../../../APICore.js');

describe('GlobalGroup', () => {
    let Globalgroup: GlobalGroup;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        Globalgroup = new GlobalGroup(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the GlobalGroups base url', async () => {
            await Globalgroup.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(GlobalGroup.baseUrl);
        });
    });

    describe('create', () => {
        it('should make a POST call to the GlobalGroups base url', async () => {
            const globalgroupModel: New<GlobalGroupModel> = {
                displayName: 'My new Globalgroup',
                members: [],
                organizationActivated: false,
                privileges: [],
                realms: [],
                temporaryPrivilegeConfigurations: [],
            };

            await Globalgroup.create(globalgroupModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(GlobalGroup.baseUrl, globalgroupModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific GlobalGroup url', async () => {
            const globalgroupToDeleteId = 'GlobalGroup-to-be-deleted';
            await Globalgroup.delete(globalgroupToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${GlobalGroup.baseUrl}/${globalgroupToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific GlobalGroup url', async () => {
            const globalgroupToGetId = 'GlobalGroup-to-be-fetched';
            await Globalgroup.get(globalgroupToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${GlobalGroup.baseUrl}/${globalgroupToGetId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific GlobalGroup url', async () => {
            const globalgroupModel: GlobalGroupModel = {
                id: 'Globalgroup-to-update-id',
                displayName: 'GlobalGroup to be updated',
                members: [],
                organizationActivated: false,
                privileges: [],
                realms: [],
                temporaryPrivilegeConfigurations: [],
            };

            await Globalgroup.update(globalgroupModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${GlobalGroup.baseUrl}/${globalgroupModel.id}`, globalgroupModel);
        });
    });
});
