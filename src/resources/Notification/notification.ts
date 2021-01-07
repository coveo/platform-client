import API from '../../APICore';
import Resource from '../Resource';
import Subscription from './Subscription/Subscription';

export default class Notifications extends Resource {
    subscription: Subscription;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.subscription = new Subscription(api, serverlessApi);
    }
}
