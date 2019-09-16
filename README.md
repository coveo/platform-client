# Coveo Cloud services' official `.js` client

The main goal of this package is to provide an easy to configure and straightforward way of querying any API fronted by the Coveo Cloud's services using javascript.

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

// listing the organization's catalogs
platform.catalog.list({page: 0, pageSize: 10}).then((res) => {
    console.log(JSON.stringify(res));
});
```

## Documentation

The whole project is built using Typescript and exposes every type needed so that you typically won't need to refer to any documentation here. API discovery throught code is a very nifty feature so we strongly recommand using this package in a Typescript environment. For that specific reason, the decision has been made not to document any option, resource or action except the main configuration options. For in-depth explanations about each and every API exposed by this package, please consult our [official documentation portal](https://docs.coveo.com/en/151/cloud-v2-developers/coveo-cloud-v2-for-developers).

### Configuration Options

| Option                 | Required | Default Value                        | Description                                                                                                                                                              |
| ---------------------- | -------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `accessTokenRetreiver` | yes      | undefined                            | A function that provides the access token or API key. Will be executed before making every call to ensure token freshness.                                               |
| `organizationId`       | yes      | undefined                            | The organization id for which the platform-client will make the calls.                                                                                                   |
| `environment`          | optional | `'production'`                       | The environment targetted by the calls. If one of following: `'development'`, `'staging'`, `'production'`, `'hipaa'`; it will automatically target the associated hosts. |
| `host`                 | optional | `'https://platform.cloud.coveo.com'` | The host targetted by the calls. Usefull to target local hosts when developping.                                                                                         |
