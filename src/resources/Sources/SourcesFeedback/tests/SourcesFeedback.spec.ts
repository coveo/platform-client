import API from '../../../../APICore.js';
import {FeedbackConsumerType} from '../../../Enums.js';
import SourcesFeedback from '../SourcesFeedback.js';
import {FeedbackPayload} from '../SourcesFeedbackInterfaces.js';

jest.mock('../../../../APICore.js');

describe('SourcesFeedback', () => {
    let sourceFeedback: SourcesFeedback;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        sourceFeedback = new SourcesFeedback(api, serverlessApi);
    });

    describe('sendFeedback', () => {
        it('should make a POST call to the specific feedback url', async () => {
            const feedback = {message: 'allo!'} as FeedbackPayload;
            await sourceFeedback.sendFeedback(FeedbackConsumerType.SOURCE_MANAGEMENT_IMPROVEMENTS, feedback);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${SourcesFeedback.baseUrl}?feedbackConsumerType=SOURCE_MANAGEMENT_IMPROVEMENTS`,
                feedback,
            );
        });
    });
});
