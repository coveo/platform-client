# Official Coveo Cloud APIs JavaScript Client

The main goal of this package is to provide an easy to configure and straightforward way of querying Coveo Cloud APIs using JavaScript.

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
