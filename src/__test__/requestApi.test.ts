import { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { PARAM_TYPE, CONFIG_TYPE } from '../builder/types';
import { ApiRequestBuilder } from '../builder/requestBuilder';

describe('test api request builder', () => {
    it('test successfully', async () => {
        const builder: ApiRequestBuilder = new ApiRequestBuilder();

        const res = (await builder
            .addConfig(CONFIG_TYPE.BASE_URL, 'http://localhost:9001')
            .addConfig(CONFIG_TYPE.METHOD, 'get')
            .addConfig(CONFIG_TYPE.URL, '/v20/acctmgmt/accounts/LHOM%7C200101HYPHEN020235001')
            .sendRequest()) as AxiosResponse;

        expect(res.status).toEqual(200);
    });

    it.skip('test post method with path param', async () => {
        const builder: ApiRequestBuilder = new ApiRequestBuilder();
        const res = (await builder
            .addConfig('baseURL', 'http://localhost:9001')
            .addConfig('method', 'get')
            .addConfig('url', '/v1/acctmgmt/accounts/account-id/:accountId/details/loan')
            .addParams(PARAM_TYPE.PATH, { accountId: '200101HYPHEN020235009' })
            .sendRequest()) as AxiosResponse;

        expect(res.status).toEqual(200);
    });

    it.skip('test add path param and query param successfully', async () => {
        const builder: ApiRequestBuilder = new ApiRequestBuilder();

        const res = (await builder
            .addConfig('baseURL', 'http://localhost:9001')
            .addConfig('method', 'get')
            .addConfig('url', '/:version/customers/customer-core/{cgid}')
            .addHeader('x-nab-channel', 'banker')
            .addHeader('token', '123-abc')
            .addHeaders({ 'x-metadata': '123123123', 'x-version': 1.9 })
            .addParam(PARAM_TYPE.PATH, 'version', 'v1')
            .addParam(PARAM_TYPE.PATH, 'cgid', '200101HYPHEN020235000CM3')
            .addParam(PARAM_TYPE.QUERY, 'partyType', 'ORG')
            .addParam(PARAM_TYPE.QUERY, 'cgid', '123123123')
            .addParam(PARAM_TYPE.QUERY, 'transRef', 'LMBULK321')
            .sendRequest()) as AxiosResponse;

        expect(res.status).toEqual(200);
    });
});
