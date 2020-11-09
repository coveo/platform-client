import Ressource from '../../Resource';
import {EditSubscriptionModel, SubscriptionModel} from './SubscriptionInterfaces';

export default class Subscription extends Ressource {
    static getBaseUrl = (orgId: string) => `/rest/organizations/${orgId}/subscriptions`;

    list() {
        return this.api.get<SubscriptionModel[]>(Subscription.getBaseUrl(this.api.organizationId));
    }

    listCurrent() {
        this.api.get<SubscriptionModel[]>(`${Subscription.getBaseUrl(this.api.organizationId)}/me`);
    }

    show(subscriptionId: string) {
        this.api.get<SubscriptionModel>(`${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}`);
    }

    showCurrent(subscriptionId: string) {
        this.api.get<SubscriptionModel>(`${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}`);
    }

    create(editSubscriptionModel: EditSubscriptionModel) {
        this.api.post<SubscriptionModel>(`${Subscription.getBaseUrl(this.api.organizationId)}`, editSubscriptionModel);
    }

    createCurrent(editSubscriptionModel: EditSubscriptionModel) {
        this.api.post<SubscriptionModel>(
            `${Subscription.getBaseUrl(this.api.organizationId)}/me`,
            editSubscriptionModel
        );
    }

    edit(subscriptionId: string, editSubscriptionModel: EditSubscriptionModel) {
        this.api.put<SubscriptionModel>(
            `${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}`,
            editSubscriptionModel
        );
    }

    editCurrent(subscriptionId: string, editSubscriptionModel: EditSubscriptionModel) {
        this.api.put<SubscriptionModel>(
            `${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}`,
            editSubscriptionModel
        );
    }

    delete(subscriptionId: string) {
        this.api.delete(`${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}`);
    }

    deleteCurrent(subscriptionId: string) {
        this.api.delete(`${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}`);
    }

    enable(subscriptionId: string) {
        this.api.put(`${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}/enable`);
    }

    enableCurrent(subscriptionId: string) {
        this.api.put(`${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}/enable`);
    }

    disable(subscriptionId: string) {
        this.api.put(`${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}/disable`);
    }

    disableCurrent(subscriptionId: string) {
        this.api.put(`${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}/disable`);
    }

    test(subscriptionId: string) {
        this.api.post(`${Subscription.getBaseUrl(this.api.organizationId)}/${subscriptionId}/test`);
    }

    testCurrent(subscriptionId: string) {
        this.api.post(`${Subscription.getBaseUrl(this.api.organizationId)}/me/${subscriptionId}/test`);
    }
}
