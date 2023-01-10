import Ressource from '../../Resource.js';
import {EditSubscriptionModel, SubscriptionModel} from './SubscriptionInterfaces.js';

export default class Subscription extends Ressource {
    static getBaseUrl = (orgId: string) => `/rest/organizations/${orgId}/subscriptions`;

    list() {
        return this.api.get<SubscriptionModel[]>(Subscription.getBaseUrl(this.api.organizationId));
    }

    listCurrent() {
        return this.api.get<SubscriptionModel[]>(`${Subscription.getBaseUrl(this.api.organizationId)}/me`);
    }

    show(subscriptionId: string) {
        return this.api.get<SubscriptionModel>(`${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}`);
    }

    showCurrent(subscriptionId: string) {
        return this.api.get<SubscriptionModel>(
            `${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}`
        );
    }

    create(editSubscriptionModel: EditSubscriptionModel) {
        return this.api.post<SubscriptionModel>(
            `${Subscription.getBaseUrl(this.api.organizationId)}`,
            editSubscriptionModel
        );
    }

    createCurrent(editSubscriptionModel: EditSubscriptionModel) {
        return this.api.post<SubscriptionModel>(
            `${Subscription.getBaseUrl(this.api.organizationId)}/me`,
            editSubscriptionModel
        );
    }

    edit(subscriptionId: string, editSubscriptionModel: EditSubscriptionModel) {
        return this.api.put<SubscriptionModel>(
            `${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}`,
            editSubscriptionModel
        );
    }

    editCurrent(subscriptionId: string, editSubscriptionModel: EditSubscriptionModel) {
        return this.api.put<SubscriptionModel>(
            `${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}`,
            editSubscriptionModel
        );
    }

    delete(subscriptionId: string) {
        return this.api.delete(`${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}`);
    }

    deleteCurrent(subscriptionId: string) {
        return this.api.delete(`${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}`);
    }

    enable(subscriptionId: string) {
        return this.api.put(`${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}/enable`);
    }

    enableCurrent(subscriptionId: string) {
        return this.api.put(`${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}/enable`);
    }

    disable(subscriptionId: string) {
        return this.api.put(`${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}/disable`);
    }

    disableCurrent(subscriptionId: string) {
        return this.api.put(`${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}/disable`);
    }

    test(subscriptionId: string) {
        return this.api.post(`${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}/test`);
    }

    testCurrent(subscriptionId: string) {
        return this.api.post(`${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}/test`);
    }
}
