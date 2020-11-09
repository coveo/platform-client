import API from '../../../APICore';
import Notification from '../notification';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('nested ressources', () => {
    let notifications: Notification;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        notifications = new Notification(api);
    });
    it('should front subscriptions', () => {
        expect(notifications.subscription).toBeDefined();
    });
});
