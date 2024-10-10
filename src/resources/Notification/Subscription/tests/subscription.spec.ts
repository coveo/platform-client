import API from '../../../../APICore.js';
import {SubscriptionFrequencyEnum, SubscriptionTypeEnum} from '../../../Enums.js';
import Subscription from '../Subscription.js';
import {EditSubscriptionModel} from '../SubscriptionInterfaces.js';

jest.mock('../../../../APICore.js');

const subscriptionModelMock: EditSubscriptionModel = {
    description: '🍇 => 😠 => 💩',
    enabled: true,
    frequency: SubscriptionFrequencyEnum.daily,
    name: '🦀',
    parameters: {emailRecipients: ['👶'], emailSubject: '🍼', fromDisplayName: '👪', serviceUrl: '🍑'},
    pattern: {
        content: {additionnalProperties: '🍔'},
        operations: ['👾', '🚀'],
        resourceTypes: ['🍔', '🥤', '🍟'],
        resultTypes: ['🍆', '👌', '💩'],
    },
    type: SubscriptionTypeEnum.email,
};

describe('Subscriptions', () => {
    let subscription: Subscription;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        subscription = new Subscription(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a get call to the specific subscription url', async () => {
            await subscription.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Subscription.getBaseUrl(api.organizationId));
        });
    });

    describe('listCurrent', () => {
        it('should make a get call to the specific subscription url', async () => {
            await subscription.listCurrent();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Subscription.getBaseUrl(api.organizationId)}/me`);
        });
    });

    describe('show', () => {
        it('should make a get call to the specific subscription url', async () => {
            const subscriptionId = '🦀';
            await subscription.show(subscriptionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}`);
        });
    });
    describe('showCurrent', () => {
        it('should make a get call to the specific subscription url', async () => {
            const subscriptionId = '🍞';
            await subscription.showCurrent(subscriptionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}`);
        });
    });
    describe('create', () => {
        it('should make a POST call to the specific subscription url', async () => {
            await subscription.create(subscriptionModelMock);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}`,
                subscriptionModelMock,
            );
        });
    });
    describe('createCurrent', () => {
        it('should make a POST call to the specific subscription url', async () => {
            await subscription.createCurrent(subscriptionModelMock);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me`,
                subscriptionModelMock,
            );
        });
    });
    describe('edit', () => {
        it('should make a PUT call to the specific subscription url', async () => {
            const subscriptionId = '🥔';
            await subscription.edit(subscriptionId, subscriptionModelMock);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}`,
                subscriptionModelMock,
            );
        });
    });
    describe('editCurrent', () => {
        it('should make a PUT call to the specific subscription url', async () => {
            const subscriptionId = '🍔';
            await subscription.editCurrent(subscriptionId, subscriptionModelMock);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}`,
                subscriptionModelMock,
            );
        });
    });
    describe('delete', () => {
        it('should make a DELETE call to the specific subscription url', async () => {
            const subscriptionId = '🍟';
            await subscription.delete(subscriptionId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}`);
        });
    });
    describe('deleteCurrent', () => {
        it('should make a DELETE call to the specific subscription url', async () => {
            const subscriptionId = '🍟';
            await subscription.deleteCurrent(subscriptionId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}`,
            );
        });
    });
    describe('enable', () => {
        it('should make a PUT call to the specific subscription url', async () => {
            const subscriptionId = '';
            await subscription.enable(subscriptionId);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}/enable`,
            );
        });
    });
    describe('enableCurrent', () => {
        it('should make a PUT call to the specific subscription url', async () => {
            const subscriptionId = '';
            await subscription.enableCurrent(subscriptionId);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}/enable`,
            );
        });
    });
    describe('disable', () => {
        it('should make a PUT call to the specific subscription url', async () => {
            const subscriptionId = '';
            await subscription.disable(subscriptionId);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}/disable`,
            );
        });
    });
    describe('disableCurrent', () => {
        it('should make a PUT call to the specific subscription url', async () => {
            const subscriptionId = '';
            await subscription.disableCurrent(subscriptionId);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}/disable`,
            );
        });
    });
    describe('test', () => {
        it('should make a PUT call to the specific subscription url', async () => {
            const subscriptionId = '';
            await subscription.test(subscriptionId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}/test`,
            );
        });
    });
    describe('testCurrent', () => {
        it('should make a PUT call to the specific subscription url', async () => {
            const subscriptionId = '';
            await subscription.testCurrent(subscriptionId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}/test`,
            );
        });
    });
});
