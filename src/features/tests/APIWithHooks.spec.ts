import {IAPI} from '../../APICore';
import {APIWithHooks} from '../APIWithHooks';

jest.mock('../../APICore');

const mockApi = (): jest.Mocked<IAPI> => ({
    organizationId: '🐟',
    get: jest.fn().mockImplementation(() => Promise.resolve({})),
    post: jest.fn().mockImplementation(() => Promise.resolve({})),
    postForm: jest.fn().mockImplementation(() => Promise.resolve({})),
    delete: jest.fn().mockImplementation(() => Promise.resolve({})),
    put: jest.fn().mockImplementation(() => Promise.resolve({})),
    abortGetRequests: jest.fn(),
});

describe('APIWithHooks', () => {
    let api: jest.Mocked<IAPI>;
    const urls = {
        get: 'get',
        post: 'post',
        postForm: 'postForm',
        delete: 'delete',
        put: 'put',
    };
    const someBodyData = {};
    const someGenericArgs = {};

    beforeEach(() => {
        jest.clearAllMocks();
        api = mockApi();
    });

    describe('with beforeAnyRequest hook', () => {
        const beforeMock = jest.fn();
        let apiWithHooks: APIWithHooks;

        beforeEach(() => {
            apiWithHooks = new APIWithHooks(api, {
                beforeAnyRequest: beforeMock,
            });
        });

        it('should trigger the hook on a get', async () => {
            await apiWithHooks.get(urls.get, someGenericArgs);

            assertInvocationWasBefore(beforeMock, api.get as jest.Mock);
            expect(api.get).toHaveBeenCalledWith(urls.get, someGenericArgs);
        });

        it('should trigger the hook on a post', async () => {
            await apiWithHooks.post(urls.post, someBodyData, someGenericArgs);

            assertInvocationWasBefore(beforeMock, api.post as jest.Mock);
            expect(api.post).toHaveBeenCalledWith(urls.post, someBodyData, someGenericArgs);
        });

        it('should trigger the hook on a postForm', async () => {
            await apiWithHooks.postForm(urls.postForm, null, someGenericArgs);

            assertInvocationWasBefore(beforeMock, api.postForm as jest.Mock);
            expect(api.postForm).toHaveBeenCalledWith(urls.postForm, null, someGenericArgs);
        });

        it('should trigger the hook on a put', async () => {
            await apiWithHooks.put(urls.put, someBodyData, someGenericArgs);

            assertInvocationWasBefore(beforeMock, api.put as jest.Mock);
            expect(api.put).toHaveBeenCalledWith(urls.put, someBodyData, someGenericArgs);
        });

        it('should trigger the hook on a delete', async () => {
            await apiWithHooks.delete(urls.delete, someGenericArgs);

            assertInvocationWasBefore(beforeMock, api.delete as jest.Mock);
            expect(api.delete).toHaveBeenCalledWith(urls.delete, someGenericArgs);
        });
    });

    describe('with afterAnySuccess hook', () => {
        const afterMock = jest.fn();
        let apiWithHooks: APIWithHooks;

        beforeEach(() => {
            apiWithHooks = new APIWithHooks(api, {
                afterAnySuccess: afterMock,
            });
        });

        it('should trigger the hook on a get', async () => {
            await apiWithHooks.get(urls.get, someGenericArgs);

            assertInvocationWasBefore(api.get as jest.Mock, afterMock);
            expect(api.get).toHaveBeenCalledWith(urls.get, someGenericArgs);
        });

        it('should trigger the hook on a post', async () => {
            await apiWithHooks.post(urls.post, someBodyData, someGenericArgs);

            assertInvocationWasBefore(api.post as jest.Mock, afterMock);
            expect(api.post).toHaveBeenCalledWith(urls.post, someBodyData, someGenericArgs);
        });

        it('should trigger the hook on a postForm', async () => {
            await apiWithHooks.postForm(urls.postForm, null, someGenericArgs);

            assertInvocationWasBefore(api.postForm as jest.Mock, afterMock);
            expect(api.postForm).toHaveBeenCalledWith(urls.postForm, null, someGenericArgs);
        });

        it('should trigger the hook on a put', async () => {
            await apiWithHooks.put(urls.put, someBodyData, someGenericArgs);

            assertInvocationWasBefore(api.put as jest.Mock, afterMock);
            expect(api.put).toHaveBeenCalledWith(urls.put, someBodyData, someGenericArgs);
        });

        it('should trigger the hook on a delete', async () => {
            await apiWithHooks.delete(urls.delete, someGenericArgs);

            assertInvocationWasBefore(api.delete as jest.Mock, afterMock);
            expect(api.delete).toHaveBeenCalledWith(urls.delete, someGenericArgs);
        });

        it('should not trigger the hook on a get failure', async () => {
            api.get.mockRejectedValue('ohno');

            expect(apiWithHooks.get(urls.get, someGenericArgs)).rejects.toThrow('ohno');

            expect(afterMock).not.toHaveBeenCalled();
        });
    });

    describe('with afterAnyException hook', () => {
        // Exception is handled
        const afterExceptionMock = jest.fn().mockReturnValue(true);
        const someError = 'ohno';
        let apiWithHooks: APIWithHooks;

        beforeEach(() => {
            apiWithHooks = new APIWithHooks(api, {
                afterAnyException: afterExceptionMock,
            });
        });

        it('should trigger the hook on a get exception', async () => {
            api.get.mockRejectedValue(someError);

            await apiWithHooks.get(urls.get, someGenericArgs);

            assertInvocationWasBefore(api.get as jest.Mock, afterExceptionMock);
            expect(afterExceptionMock).toHaveBeenCalledWith(urls.get, someGenericArgs, someError);
        });

        it('should not trigger the hook on a get success', async () => {
            await apiWithHooks.get(urls.get, someGenericArgs);

            expect(afterExceptionMock).not.toHaveBeenCalled();
        });

        it('should trigger the hook on a post exception', async () => {
            api.post.mockRejectedValue(someError);

            await apiWithHooks.post(urls.post, someBodyData, someGenericArgs);

            assertInvocationWasBefore(api.post as jest.Mock, afterExceptionMock);
            expect(afterExceptionMock).toHaveBeenCalledWith(urls.post, someGenericArgs, someError);
        });

        it('should not trigger the hook on a post success', async () => {
            await apiWithHooks.post(urls.post, someBodyData, someGenericArgs);

            expect(afterExceptionMock).not.toHaveBeenCalled();
        });

        it('should trigger the hook on a postForm exception', async () => {
            api.postForm.mockRejectedValue(someError);

            await apiWithHooks.postForm(urls.postForm, null, someGenericArgs);

            assertInvocationWasBefore(api.postForm as jest.Mock, afterExceptionMock);
            expect(afterExceptionMock).toHaveBeenCalledWith(urls.postForm, someGenericArgs, someError);
        });

        it('should not trigger the hook on a postForm success', async () => {
            await apiWithHooks.postForm(urls.postForm, null, someGenericArgs);

            expect(afterExceptionMock).not.toHaveBeenCalled();
        });

        it('should trigger the hook on a put exception', async () => {
            api.put.mockRejectedValue(someError);

            await apiWithHooks.put(urls.put, someBodyData, someGenericArgs);

            assertInvocationWasBefore(api.put as jest.Mock, afterExceptionMock);
            expect(afterExceptionMock).toHaveBeenCalledWith(urls.put, someGenericArgs, someError);
        });

        it('should not trigger the hook on a put success', async () => {
            await apiWithHooks.put(urls.put, someBodyData, someGenericArgs);

            expect(afterExceptionMock).not.toHaveBeenCalled();
        });

        it('should trigger the hook on a delete exception', async () => {
            api.delete.mockRejectedValue(someError);

            await apiWithHooks.delete(urls.delete, someGenericArgs);

            assertInvocationWasBefore(api.delete as jest.Mock, afterExceptionMock);
            expect(afterExceptionMock).toHaveBeenCalledWith(urls.delete, someGenericArgs, someError);
        });

        it('should not trigger the hook on a delete success', async () => {
            await apiWithHooks.delete(urls.delete, someGenericArgs);

            expect(afterExceptionMock).not.toHaveBeenCalled();
        });
    });

    describe('with all hooks', () => {
        const beforeMock = jest.fn();
        const afterMock = jest.fn();
        const afterExceptionMock = jest.fn().mockReturnValue(true);
        const someError = 'ohno';
        let apiWithHooks: APIWithHooks;

        beforeEach(() => {
            apiWithHooks = new APIWithHooks(api, {
                beforeAnyRequest: beforeMock,
                afterAnySuccess: afterMock,
                afterAnyException: afterExceptionMock,
            });
        });

        it('should only call beforeAnyRequest and afterAnySuccess on get success', async () => {
            await apiWithHooks.get(urls.get, someGenericArgs);

            assertInvocationInOrder(beforeMock, api.get as jest.Mock, afterMock);
            expect(afterExceptionMock).not.toHaveBeenCalled();
        });

        it('should call only beforeAnyRequest and afterAnyException on get error', async () => {
            api.get.mockRejectedValue(someError);

            await apiWithHooks.get(urls.get, someGenericArgs);

            assertInvocationInOrder(beforeMock, api.get as jest.Mock, afterExceptionMock);
            expect(afterMock).not.toHaveBeenCalled();
        });
    });

    const assertInvocationWasBefore = (expectedFirst: jest.Mock, expectedSecond: jest.Mock) => {
        expect(expectedFirst).toHaveBeenCalled();
        expect(expectedSecond).toHaveBeenCalled();
        expect(expectedFirst.mock.invocationCallOrder[0]).toBeLessThan(expectedSecond.mock.invocationCallOrder[0]);
    };

    const assertInvocationInOrder = (...mocks: jest.Mock[]) => {
        mocks.forEach((mock) => expect(mock).toHaveBeenCalled());
        mocks.slice(0, mocks.length - 1).forEach(({mock}, i) => {
            expect(mock.invocationCallOrder[0]).toBeLessThan(mocks[i + 1].mock.invocationCallOrder[0]);
        });
    };
});
