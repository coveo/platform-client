import API from '../../../APICore.js';
import Notification from '../notification.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('nested ressources', () => {
    let notifications: Notification;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        notifications = new Notification(api, serverlessApi);
    });
    it('should front subscriptions', () => {
        expect(notifications.subscription).toBeDefined();
    });
});
