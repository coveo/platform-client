import API from '../../APICore';
import Resource from '../Resource';
import Subscription from './Subscription/Subscription';

export default class Notifications extends Resource {
    subscription: Subscription;

    constructor(protected api: API) {
        super(api);

        this.subscription = new Subscription(api);
    }
}
