import API from '../../../../APICore';
import Members from '../Members';

jest.mock('../../../../APICore');

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
});
