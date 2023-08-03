import API from '../../APICore.js';
import Resource from '../Resource.js';
import Subscription from './Subscription/Subscription.js';

export default class Notifications extends Resource {
    subscription: Subscription;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);

        this.subscription = new Subscription(api, serverlessApi);
    }
}
