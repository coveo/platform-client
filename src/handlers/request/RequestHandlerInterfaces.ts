import {Predicate} from '../../utils/types.js';

export interface EnrichedRequestInit extends RequestInit {
    url: string;
}

export interface RequestHandler {
    /**
     * Whether this handler can process the request.
     */
    canProcess: Predicate<EnrichedRequestInit>;
    /**
     * How to process the requests.
     *
     * @param request The [request object](https://developer.mozilla.org/en-US/docs/Web/API/Request).
     */
    process(request: EnrichedRequestInit): EnrichedRequestInit;
}
