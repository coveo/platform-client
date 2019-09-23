# Official Coveo Cloud APIs JavaScript Client

The main goal of this package is to provide an easy to configure and straightforward way of querying Coveo Cloud APIs using JavaScript.

[![Build Status](https://img.shields.io/travis/coveo/platform-client.svg?style=flat-square)](https://travis-ci.org/coveo/platform-client)
[![Npm total downloads badge](https://img.shields.io/npm/dt/@coveord/platform-client?style=flat-square)](https://www.npmjs.com/package/react-vapor)
[![license](https://img.shields.io/hexpm/l/plug.svg?style=flat-square)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## Getting started

### Install

```bash
npm install @coveord/platform-client
# Typescript types are included in the package
```

### Configure

```js
const platform = new CoveoPlatform({
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
const platform = new CoveoPlatform({
    organizationId: 'some-coveo-platform-organization-id',
    accessTokenRetreiver: () => 'your-coveo-platform-access-token-or-api-key',
});

// List the organization catalogs
platform.catalog.list({page: 0, pageSize: 10}).then((res) => {
    console.log(JSON.stringify(res));
});
```

## Documentation

This project is built using TypeScript and automatically generates relevant type declarations. Most IDEs with TypeScript integration will display those type declarations as autocompletions, so that you typically will not need to refer to external documentation. Hence, the decision has been made not to document any option, resource, or action, except for the main configuration options. For in-depth documentation on the APIs exposed by this package, please consult our [official documentation portal](https://docs.coveo.com/en/151/cloud-v2-developers/coveo-cloud-v2-for-developers).

### Configuration Options

| Option                 | Required | Default Value                        | Description                                                                                                                                      |
| ---------------------- | -------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accessTokenRetriever` | yes      | undefined                            | A function that provides the access token or API key. Executed before every call to ensure token freshness.                                      |
| `organizationId`       | yes      | undefined                            | The unique identifier of the target organization.                                                                                                |
| `environment`          | optional | `'production'`                       | The target environment. If one of following: `'development'`, `'staging'`, `'production'`, `'hipaa'`; automatically targets the associated host. |
| `host`                 | optional | `'https://platform.cloud.coveo.com'` | The target host. Useful to target local hosts when testing.                                                                                      |
| `responseHandlers`     | optional | []                                   | Custom server response handlers. See [error handling section](#error-handling) for detailed explanation.                                         |

### Error handling

Each request made by the `platform-client`, once resolved or rejected, gets processed by one (and only one) of the response handlers. Some very basic response handlers are used by default, but you can override their behavior by specifying your own in the `responseHandlers` [configuration option](#configuration-option). The order in which they are specified defines their priority. Meaning that the first handler of the array that can process the response is used to do so.

A response handler is defined as such:

```ts
interface IRestResponseHandler {
    canProcess(response: Response): boolean; // whether the handler should be used to process the response
    process<T>(response: Response): Promise<IRestResponse<T>>; // defines how the handler processes the response
}
```

Example

```ts
const MySuccessResponseHandler: IRestResponseHandler = {
    canProcess: (response: Response): boolean => response.ok;
    process: async <T>(response: Response): Promise<IRestResponse<T>> => {
        const data = await response.json();
        console.log(data);
        return data;
    };
}
```