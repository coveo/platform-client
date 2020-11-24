import API from '../../../../APICore';
import {SubscriptionFrequencyEnum, SubscriptionTypeEnum} from '../../../Enums';
import Subscription from '../Subscription';
import {EditSubscriptionModel} from '../SubscriptionInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

const subscriptionModelMock: EditSubscriptionModel = {
    description: '🍇 => 😠 => 💩',
    enabled: true,
    frequency: SubscriptionFrequencyEnum.daily,
    name: '🦀',
    parameters: {emailRecipients: ['👶'], emailSubject: '🍼', fromDisplayName: '👪', serviceUrl: '🍑'},
    pattern: {
        content: {additionnalProperties: '🍔'},
        operations: ['👾', '🚀'],
        recourceTypes: ['🍔', '🥤', '🍟'],
    },
    type: SubscriptionTypeEnum.email,
};

describe('Subscriptions', () => {
    let subscription: Subscription;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        subscription = new Subscription(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a get call to the specific subscription url', () => {
            subscription.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Subscription.getBaseUrl(api.organizationId));
        });
    });

    describe('listCurrent', () => {
        it('should make a get call to the specific subscription url', () => {
            subscription.listCurrent();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Subscription.getBaseUrl(api.organizationId)}/me`);
        });
    });

    describe('show', () => {
        it('should make a get call to the specific subscription url', () => {
            const subscriptionId = '🦀';
            subscription.show(subscriptionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}`);
        });
    });
    describe('showCurrent', () => {
        it('should make a get call to the specific subscription url', () => {
            const subscriptionId = '🍞';
            subscription.showCurrent(subscriptionId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}`);
        });
    });
    describe('create', () => {
        it('should make a POST call to the specific subscription url', () => {
            subscription.create(subscriptionModelMock);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}`,
                subscriptionModelMock
            );
        });
    });
    describe('createCurrent', () => {
        it('should make a POST call to the specific subscription url', () => {
            subscription.createCurrent(subscriptionModelMock);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me`,
                subscriptionModelMock
            );
        });
    });
    describe('edit', () => {
        it('should make a PUT call to the specific subscription url', () => {
            const subscriptionId = '🥔';
            subscription.edit(subscriptionId, subscriptionModelMock);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}`,
                subscriptionModelMock
            );
        });
    });
    describe('editCurrent', () => {
        it('should make a PUT call to the specific subscription url', () => {
            const subscriptionId = '🍔';
            subscription.editCurrent(subscriptionId, subscriptionModelMock);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}`,
                subscriptionModelMock
            );
        });
    });
    describe('delete', () => {
        it('should make a DELETE call to the specific subscription url', () => {
            const subscriptionId = '🍟';
            subscription.delete(subscriptionId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}`);
        });
    });
    describe('deleteCurrent', () => {
        it('should make a DELETE call to the specific subscription url', () => {
            const subscriptionId = '🍟';
            subscription.deleteCurrent(subscriptionId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}`
            );
        });
    });
    describe('enable', () => {
        it('should make a PUT call to the specific subscription url', () => {
            const subscriptionId = '';
            subscription.enable(subscriptionId);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}/enable`
            );
        });
    });
    describe('enableCurrent', () => {
        it('should make a PUT call to the specific subscription url', () => {
            const subscriptionId = '';
            subscription.enableCurrent(subscriptionId);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}/enable`
            );
        });
    });
    describe('disable', () => {
        it('should make a PUT call to the specific subscription url', () => {
            const subscriptionId = '';
            subscription.disable(subscriptionId);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}/disable`
            );
        });
    });
    describe('disableCurrent', () => {
        it('should make a PUT call to the specific subscription url', () => {
            const subscriptionId = '';
            subscription.disableCurrent(subscriptionId);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}/disable`
            );
        });
    });
    describe('test', () => {
        it('should make a PUT call to the specific subscription url', () => {
            const subscriptionId = '';
            subscription.test(subscriptionId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/${subscriptionId}/test`
            );
        });
    });
    describe('testCurrent', () => {
        it('should make a PUT call to the specific subscription url', () => {
            const subscriptionId = '';
            subscription.testCurrent(subscriptionId);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Subscription.getBaseUrl(api.organizationId)}/me/${subscriptionId}/test`
            );
        });
    });
});
