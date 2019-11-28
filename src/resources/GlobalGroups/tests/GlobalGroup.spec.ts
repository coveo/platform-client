import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import GlobalGroup from '../GlobalGroup';
import {GlobalGroupModel} from '../GlobalGroupInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('GlobalGroup', () => {
    let Globalgroup: GlobalGroup;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        Globalgroup = new GlobalGroup(api);
    });

    describe('list', () => {
        it('should make a GET call to the GlobalGroups base url', () => {
            Globalgroup.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(GlobalGroup.baseUrl);
        });
    });

    describe('create', () => {
        it('should make a POST call to the GlobalGroups base url', () => {
            const globalgroupModel: New<GlobalGroupModel> = {
                displayName: 'My new Globalgroup',
                members: [],
                organizationActivated: false,
                privileges: [],
                realms: [],
                temporaryPrivilegeConfigurations: [],
            };

            Globalgroup.create(globalgroupModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(GlobalGroup.baseUrl, globalgroupModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific GlobalGroup url', () => {
            const globalgroupToDeleteId = 'GlobalGroup-to-be-deleted';
            Globalgroup.delete(globalgroupToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${GlobalGroup.baseUrl}/${globalgroupToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific GlobalGroup url', () => {
            const globalgroupToGetId = 'GlobalGroup-to-be-fetched';
            Globalgroup.get(globalgroupToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${GlobalGroup.baseUrl}/${globalgroupToGetId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific GlobalGroup url', () => {
            const globalgroupModel: GlobalGroupModel = {
                id: 'Globalgroup-to-update-id',
                displayName: 'GlobalGroup to be updated',
                members: [],
                organizationActivated: false,
                privileges: [],
                realms: [],
                temporaryPrivilegeConfigurations: [],
            };

            Globalgroup.update(globalgroupModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${GlobalGroup.baseUrl}/${globalgroupModel.id}`, globalgroupModel);
        });
    });
});
