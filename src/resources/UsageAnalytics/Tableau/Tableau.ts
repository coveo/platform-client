import API from '../../../APICore';
import {TableauProjectName} from '../../Enums';
import Resource from '../../Resource';
import {DashboardModel, TableauModel} from './TableauInterfaces';

export default class Tableau extends Resource {
    static baseUrl = `/rest/ua/v15/tableau/${API.orgPlaceholder}`;

    getHomepage() {
        return this.api.get<TableauModel>(`${Tableau.baseUrl}/homepage`);
    }

    getReports() {
        return this.api.get<DashboardModel[]>(`${Tableau.baseUrl}/dashboards`);
    }

    getReport(projectName: TableauProjectName, contentUrl: string) {
        return this.api.get<TableauModel>(`${Tableau.baseUrl}/${projectName}/${contentUrl}`);
    }
}
