import API from '../../../APICore.js';
import {FeedbackConsumerType} from '../../Enums.js';
import Resource from '../../Resource.js';
import {FeedbackPayload} from './SourcesFeedbackInterfaces.js';

export default class SourcesFeedback extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources/feedback`;

    sendFeedback(feedbackConsumerType: FeedbackConsumerType, feedbackPayload: FeedbackPayload) {
        return this.api.post(this.buildPath(SourcesFeedback.baseUrl, {feedbackConsumerType}), feedbackPayload);
    }
}
