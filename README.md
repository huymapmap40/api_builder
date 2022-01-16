# Api Config Builder

### Package Info:

This is an utility of api config builder base on [axios](https://www.npmjs.com/package/axios) package. It make more easily to create new a http request and handling response.
- Read introduce [axios](https://axios-http.com/docs/intro)
- More contribute to [api-config-builder](https://github.com/huymapmap40/api_builder) github repo

### Installing Package:

```
npm install api-config-builder
```
### Table methods:

| Method name  | Descriptions | Note |
| ------------- | ------------- |------------- |
| addConfig  | Adding any config for a http request  |Read [axios config](https://axios-http.com/docs/req_config)|
| addParam  | Adding single query param or path param specify key and value string  |Content   |
| addParams  | Adding object quey param or path param  |Include 1 or more properties   |
| addHeader  | Adding single header with key-value pair string  |Content   |
| addHeaders  | Adding object header with more properties  |Content   |
| sendRequest  | Create a http request and send it with all config added  |Content   |
### Usage:

1. import module `Api Config Builder`

```typescript
import ApiRequestBuilder from 'api-config-builder';
```

2. Create object `Api Config Builder`:

```typescript
const builder = new ApiRequestBuilder();
```

3. Create a http request

```typescript
const response = builder
            .addConfig('baseURL', 'http://localhost:9001')
            .addConfig('method', 'get')
            .addConfig('url', '/:version/customers/customer-core/{cgid}')
            .addHeader('x-channel', 'mobile')
            .addHeader('token', '123-abc')
            .addHeaders({ 'x-metadata': '123123123', 'x-version': 1.9 })
            .addParam(PARAM_TYPE.PATH, 'version', 'v1')
            .addParam(PARAM_TYPE.PATH, 'cgid', '200101HYPHEN020235000CM3')
            .addParam(PARAM_TYPE.QUERY, 'partyType', 'ORG')
            .addParam(PARAM_TYPE.QUERY, 'cgid', '123123123')
            .addParam(PARAM_TYPE.QUERY, 'transRef', 'LMBULK321')
            .sendRequest();
```
*Note:* You can declare a placeholder for path param in **url endpoint** like this
```typescript
addConfig('url', '/:version/customers/customer-core/:cgid')
```
or
```typescript
addConfig('url', '/{version}/customers/customer-core/{cgid}')
```
then assign value addParam method:
```typescript
.addParam(PARAM_TYPE.PATH, 'version', 'v1')
            .addParam(PARAM_TYPE.PATH, 'cgid', '200101HYPHEN020235000CM3')
```

### Publish package:
```
- npm run build
- npm publish
```