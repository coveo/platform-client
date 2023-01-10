# Official Coveo Cloud APIs JavaScript Client

The main goal of this package is to provide an easy to configure and straightforward way of querying Coveo Cloud APIs using JavaScript.

[![Build Status](https://img.shields.io/travis/coveo/platform-client.svg?style=flat-square)](https://travis-ci.org/coveo/platform-client)
[![Npm total downloads badge](https://img.shields.io/npm/dt/@coveo/platform-client?style=flat-square)](https://www.npmjs.com/package/@coveo/platform-client)
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
npm install @coveo/platform-client
# Typescript types are included in the package
```

### Import

Note, this project is pure ESM, `require` won't work and CommonJS support is limited.

```js
// using default import
import PlatformClient from '@coveo/platform-client';

// using named import
import {PlatformClient} from '@coveo/platform-client';

// using dynamic import, works in CJS ⚠ requires an async context ⚠
const {PlatformClient} = await import('@coveo/platform-client');
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

The `platform-client` package is built on top of the `fetch` API and is not entirely supported by all JavaScript runtime environments.
Consequently, for Node, we recommend using Node 18 or [undici](https://github.com/nodejs/undici) to polyfill `fetch` globally

#### Node.js example

```js
if (!global['fetch']) {
    global['fetch'] = require('undici').fetch;
}
const PlatformClient = require('@coveo/platform-client').default;

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
if (!global['fetch']) {
    global['fetch'] = require('undici').fetch;
}
const PlatformClient = require('@coveo/platform-client').default;

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

| Option             | Required | Default Value                        | Description                                                                                                                                 |
| ------------------ | -------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessToken`      | yes      | undefined                            | The access token or API key.                                                                                                                |
| `organizationId`   | yes      | undefined                            | The unique identifier of the target organization.                                                                                           |
| `environment`      | optional | `'production'`                       | The target environment. If one of following: `'development'`, `'stg'` `'production'`, `'hipaa'`; automatically targets the associated host. |
| `host`             | optional | `'https://platform.cloud.coveo.com'` | The target host. Useful to target local hosts when testing.                                                                                 |
| `serverlessHost`   | optional | `'https://api.cloud.coveo.com'`      | The target host for serverless APIs.                                                                                                        |
| `responseHandlers` | optional | []                                   | Custom server response handlers. See [error handling section](#error-handling) for detailed explanation.                                    |
| `region`           | optional | Region.US                            | The target region.                                                                                                                          |

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

### Extending the client

In cases where you want to expand the standard capabilities of the platform client with internal or experimental resources, you can do so within the scope of your own project by extending the `PlatformClient` class.

```ts
import {API, PlatformClient, PlatformClientOptions, Resource} from '@coveo/platform-client';

class Something extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/something`;

    list() {
        this.api.get(Something.baseUrl);
    }
}

const experimentalResources: Array<{key: string; resource: typeof Resource}> = [
    {key: 'something', resource: Something},
];

class ExperimentalPlatformClient extends PlatformClient {
    something: Something;

    constructor(options: PlatformClientOptions) {
        super(options);

        experimentalResources.forEach(({key, resource}) => {
            this[key] = new resource(this.API, this.ServerlessAPI);
        });
    }
}

// usage
ExperimentalPlatformClient.something.list();
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)
