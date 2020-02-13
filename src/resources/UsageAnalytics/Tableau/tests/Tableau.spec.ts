import API from '../../../../APICore';
import {TableauProjectName} from '../../../Enums';
import Tableau from '../Tableau';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Tableau', () => {
    let tableau: Tableau;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        tableau = new Tableau(api);
    });

    describe('getHomepage', () => {
        it('should make a GET call to the specific tableau for homepage', () => {
            tableau.getHomepage();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Tableau.baseUrl}/homepage`);
        });
    });

    describe('getReports', () => {
        it('should make a GET call to the specific tableau for advanced reports', () => {
            tableau.getReports();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Tableau.baseUrl}/dashboards`);
        });
    });

    describe('getReport', () => {
        it('should make a GET call to the specific tableau for dashboards', () => {
            const projectName = TableauProjectName.Dashboards;
            const contentUrl = '0_0';

            tableau.getReport(projectName, contentUrl);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Tableau.baseUrl}/${projectName}/${contentUrl}`);
        });

        it('should make a GET call to the specific tableau for components', () => {
            const projectName = TableauProjectName.Components;
            const contentUrl = 'o_o';

            tableau.getReport(projectName, contentUrl);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Tableau.baseUrl}/${projectName}/${contentUrl}`);
        });
    });
});
