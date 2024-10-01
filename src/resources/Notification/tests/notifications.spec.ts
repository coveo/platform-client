import API from '../../../APICore.js';
import Notification from '../notification.js';

jest.mock('../../../APICore.js');

describe('nested ressources', () => {
    let notifications: Notification;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        notifications = new Notification(api, serverlessApi);
    });
    it('should front subscriptions', () => {
        expect(notifications.subscription).toBeDefined();
    });
});
