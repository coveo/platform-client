# Official Coveo Cloud APIs JavaScript Client

The main goal of this package is to provide an easy to configure and straightforward way of querying Coveo Cloud APIs using JavaScript.

[![Build Status](https://img.shields.io/travis/coveo/platform-client.svg?style=flat-square)](https://travis-ci.org/coveo/platform-client)
[![Npm total downloads badge](https://img.shields.io/npm/dt/@coveord/platform-client?style=flat-square)](https://www.npmjs.com/package/@coveord/platform-client)
[![license](https://img.shields.io/hexpm/l/plug.svg?style=flat-square)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## Getting started

### Build

```bash
npm i
npm run build
```

### Install

```bash
npm install @coveord/platform-client
# Typescript types are included in the package
```

### Import

```js
// using default import
import PlatformClient from '@coveord/platform-client';

// using named import
import {PlatformClient} from '@coveord/platform-client';

// using commonjs require
const PlatformClient = require('@coveord/platform-client').default;
```

### Configure

```js
const platform = new PlatformClient({
    /* configuration options */
});
```

### Use

```js
platform.resource.action({
    /* action dependant options */
});
```

Every action returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) object.

### Example

```js
const platform = new PlatformClient({
    organizationId: 'some-coveo-platform-organization-id',
    accessToken: () => 'your-coveo-platform-access-token-or-api-key',
});

// List the organization catalogs
const catalogs = await platform.catalog.list({page: 0, pageSize: 10});
doSometing(catalogs);
```

### Compatibility

The `platform-client` package is built on top of the `fetch` API and some related features such as the `AbortController` which are not entirely supported by all JavaScript runtime environments. Consequently, we recommend including the following list of polyfills to your project before using it in production.

-   [Polyfill for `fetch`](https://github.com/matthew-andrews/isomorphic-fetch)
-   [Polyfill for `AbortController`](https://github.com/mo/abortcontroller-polyfill)

#### Node.js example

```js
require('isomorphic-fetch');
require('abortcontroller-polyfill');
const PlatformClient = require('@coveord/platform-client').default;

const coveoPlatform = new PlatformClient({
    /* options */
});

coveoPlatform.source
    .list()
    .then((res) => {
        console.log(JSON.stringify(res));
    })
    .catch((e) => {
        console.error(e);
    });
```

### Global Configuration

It is also possible to provide global request settings for all requests made by the client; Simply provide the configuration in the `globalRequestSettings` property of the options. This can be useful for applying necessary headers or configurations for network requests. For example, you might include a proxy authorization header for requests routed through a proxy server using the [`Proxy-Authorization` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Proxy-Authorization):

#### Node.js example

```js
require('isomorphic-fetch');
require('abortcontroller-polyfill');
const PlatformClient = require('@coveord/platform-client').default;

const coveoPlatform = new PlatformClient({
    globalRequestSettings: {
        headers: {
            'Proxy-Authorization': 'Basic YWxhZGRpbjpvcGVuc2VzYW1l',
        },
    },
});

coveoPlatform.source
    .list()
    .then((res) => {
        console.log(JSON.stringify(res));
    })
    .catch((e) => {
        console.error(e);
    });
```

## Documentation

This project is built using TypeScript and automatically generates relevant type declarations. Most IDEs with TypeScript integration will display those type declarations as autocompletions, so that you typically will not need to refer to external documentation. Hence, the decision has been made not to document any option, resource, or action, except for the main configuration options. For in-depth documentation on the APIs exposed by this package, please consult our [official documentation portal](https://docs.coveo.com/en/151/cloud-v2-developers/coveo-cloud-v2-for-developers).

### Configuration Options

| Option             | Required | Default Value                        | Description                                                                                                                                      |
| ------------------ | -------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accessToken`      | yes      | undefined                            | The access token or API key.                                                                                                                     |
| `organizationId`   | yes      | undefined                            | The unique identifier of the target organization.                                                                                                |
| `environment`      | optional | `'production'`                       | The target environment. If one of following: `'development'`, `'staging'`, `'production'`, `'hipaa'`; automatically targets the associated host. |
| `host`             | optional | `'https://platform.cloud.coveo.com'` | The target host. Useful to target local hosts when testing.                                                                                      |
| `serverlessHost`   | optional | `'https://api.cloud.coveo.com'`      | The target host for serverless APIs.                                                                                                             |
| `responseHandlers` | optional | []                                   | Custom server response handlers. See [error handling section](#error-handling) for detailed explanation.                                         |
| `region`           | optional | Region.US                            | The target region.                                                                                                                               |

### Error handling

Each request made by the `platform-client`, once resolved or rejected, gets processed by one (and only one) of the response handlers. Some very basic response handlers are used by default, but you can override their behavior by specifying your own in the `responseHandlers` [configuration option](#configuration-option). The order in which they are specified defines their priority. Meaning that the first handler of the array that can process the response is used to do so.

A response handler is defined as such:

```ts
interface ResponseHandler {
    canProcess(response: Response): boolean; // whether the handler should be used to process the response
    process<T>(response: Response): Promise<T>; // defines how the handler processes the response
}
```

Example

```ts
const MySuccessResponseHandler: ResponseHandler = {
    canProcess: (response: Response): boolean => response.ok;
    process: async <T>(response: Response): Promise<T> => {
        const data = await response.json();
        console.log(data);
        return data;
    };
}
```

### Ad hoc requests

Sometimes, a specific `platform-client` configuration is required for a one-time task. In such use cases, we can leverage the `withFeatures()` method on the `platform-client` instance. This will prevent having to create a `new PlatformClient` instance for just one usage.

A feature is defined as a function that returns a set of new configuration options to be used for the next request.

```ts
type Feature = (currentOptions: PlatformClientOptions) => PlatformClientOptions;
```

Where `currentOptions` are the options currently used by the client instance to make requests.

Example

```ts
const europeRegion: Feature = (currentOptions) => ({
    ...currentOptions,
    region: Region.EU,
});

const europeOrganizations = await platform.withFeatures(europeRegion).organization.list();
```

Multiple features can be used at once, **each feature will override the options returned by the previous one**.

```ts
const notifyOnSuccess = (message) => (currentOptions) => ({
    ...currentOptions,
    responseHandlers: [
        {
            canProcess: (response) => response.ok,
            process: async (response) => {
                const result = await response.json();
                showSuccessToast(message);
                return result;
            },
        },
        ...currentOptions.responseHandlers,
    ],
});

const notifyOnError = (message) => (currentOptions) => ({
    ...currentOptions,
    responseHandlers: [
        ...currentOptions.responseHandlers,
        {
            canProcess: () => true,
            process: async (response) => {
                const error = await response.json();
                showErrorToast(message);
                throw error;
            },
        },
    ],
});

platform.withFeatures(notifyOnSuccess('It worked!'), notifyOnError('It failed!')).field.delete('unwanted-field-id');
```

## Contributing

### Guidelines

-   Make sure your changes are fully tested (when applicable).
-   We tend to avoid comments in our code base, we strongly prefer good naming and code structure.
-   Avoid pushing similar changes in different commits if it's within the same feature, because we want the changelogs to be clear and simple. To avoid that, there are at least 2 options:
    1. Squash the commits into one when merging (you need to edit the final commit message though)
    1. amend the previous commit when making related changes (`git commit --amend --no-edit`)

### Commit messages

**Every commit message must comply with the [Angular Commit Message Conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format) specification. We use the commit messages to automatically bump the package version according to the semantic versionning notation. Moreover, we generate changlogs for each version using those commit messages.**

-   You can either manually write a commit message that follows the convention using your favorite method.
-   Or you can run `npm run commit-cli`. It will prompt you some questions about the nature of your changes, then it will commit your staged changes along with a generated message that follows our convention.
-   Commits containing breaking changes need to be markeed as such in the commit footer. See [BREAKING CHANGE convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit-message-footer).
