import API from '../../../APICore';
import Organizations from '../Organizations';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Organizations', () => {
    let organizations: Organizations;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        organizations = new Organizations(api);
    });

    describe('list', () => {
        it('should make a GET call to the Groups base url', () => {
            organizations.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Organizations.baseUrl);
        });
    });

    describe('create', () => {
        it('should make a POST call to the Groups base url', () => {
            const name = 'OrgName';

            organizations.create({name});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${Organizations.baseUrl}?name=${name}`, {});
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Organization url', () => {
            const groupToDeleteId = 'Organizations-to-be-deleted';
            organizations.delete(groupToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Organizations.baseUrl}/${groupToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Organization url', () => {
            const groupToGetId = 'Organizations-to-be-fetched';
            organizations.get(groupToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Organizations.baseUrl}/${groupToGetId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Organization url', () => {
            const organizationModel = {
                id: 'organizations-to-update-id',
                displayName: 'new name',
            };

            organizations.update(organizationModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Organizations.baseUrl}/${organizationModel.id}`, organizationModel);
        });
    });
});
