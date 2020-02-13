import API from '../../APICore';
import Resource from '../Resource';
import Tableau from './Tableau/Tableau';

export default class UsageAnalytics extends Resource {
    tableau: Tableau;

    constructor(protected api: API) {
        super(api);

        this.tableau = new Tableau(api);
    }
}
