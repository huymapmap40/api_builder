import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IRequestBuilder, DataConfig, PARAM_TYPE, DataRequest, CONFIG_TYPE } from './types';

export class ApiRequestBuilder implements IRequestBuilder {
    private configObj: AxiosRequestConfig;

    /**
     * Constructor for ApiRequestBuilder. Init empty object by default
     */
    constructor() {
        this.configObj = {};
    }

    /**
     * Method to update current object config by attach new data config object
     * @param data object config data input
     * @returns an AxiosRequestConfig
     */
    private updateRequestConfig(data: any): AxiosRequestConfig {
        return {
            ...this.configObj,
            ...data
        } as AxiosRequestConfig;
    }

    /**
     * Generic method add any config request by data pair key and value
     * @param name key data of config request
     * @param value value of config request
     * @returns ApiRequestBuilder instance
     */
    public addConfig<K, V>(name: K | CONFIG_TYPE, value: V): this {
        const configRequest: DataConfig = {};
        configRequest[`${name}`] = value;
        this.configObj = this.updateRequestConfig(configRequest);
        return this;
    }

    /**
     * Method add a single specific config query param or path param for request
     * @param paramType define type of request param (query param | path param)
     * @param fieldName key data of param request
     * @param value value of param request
     * @returns ApiRequestBuilder instance
     */
    public addParam(paramType: PARAM_TYPE, fieldName: string, value: string | number): this {
        let urlUpdated: string | undefined = this.configObj.url;
        if (paramType === PARAM_TYPE.PATH) {
            const regexReplace = new RegExp(`\{${fieldName}\}|\:${fieldName}`);
            if (regexReplace.test(urlUpdated as string)) {
                urlUpdated = urlUpdated?.replace(regexReplace, value.toString());
            } else {
                throw new Error(
                    `=======> Cannot update URL with invalid param "${fieldName}: ${value}"\n Check your input params carefully again`
                );
            }
        } else {
            urlUpdated += urlUpdated?.includes('?') ? `&${fieldName}=${value}` : `?${fieldName}=${value}`;
        }
        this.configObj = this.updateRequestConfig({ url: urlUpdated });
        return this;
    }

    /**
     * Method multiple config query param or path param for request
     * @param paramType define type of request param (query param | path param)
     * @param datas an object data config with key value pair
     * @returns ApiRequestBuilder instance
     */
    public addParams(paramType: PARAM_TYPE, datas: DataRequest): this {
        let newUpdatedUrl: string | undefined = this.configObj.url;
        if (this.configObj?.url) {
            if (paramType === PARAM_TYPE.QUERY) {
                let dataSequence = '';
                const listFieldName = Object.keys(datas);
                listFieldName.forEach((key, index) => {
                    dataSequence +=
                        index != listFieldName.length - 1 ? `${key}=${datas[key]}&` : `${key}=${datas[key]}`;
                });
                newUpdatedUrl += `?${dataSequence}`;
            } else {
                const regexPathParam = /(?<=\{)\w+(?=\})|(?<=\:)\w+/g;
                const arrayParamMatched = newUpdatedUrl?.match(regexPathParam);
                try {
                    arrayParamMatched?.forEach((item) => {
                        const regexReplace = new RegExp(`\{${item}\}|\:${item}`);
                        newUpdatedUrl = newUpdatedUrl?.replace(regexReplace, datas[item].toString());
                    });
                } catch (e) {
                    console.error('========> Failed to build path param', e);
                }
            }
        } else {
            console.log('Error==========> Need use addConfig() for url before addParams()');
        }
        this.configObj = this.updateRequestConfig({ url: newUpdatedUrl });
        return this;
    }

    /**
     * Method add multiple request headers by object
     * @param dataHeaders an object inculde more properties config header with key value pair
     * @returns ApiRequestBuilder instance
     */
    public addHeaders(dataHeaders: DataRequest): this {
        this.configObj = this.updateRequestConfig({ headers: { ...this.configObj.headers, ...dataHeaders } });
        return this;
    }

    /**
     * Method add single config request header with key and value input
     * @param key name of request header
     * @param value value of request header
     * @returns ApiRequestBuilder instance
     */
    public addHeader(key: string, value: string | number): this {
        const header: any = {};
        header[key] = value;
        this.configObj = this.updateRequestConfig({ headers: { ...this.configObj.headers, ...header } });
        return this;
    }

    /**
     * Method send a http request with all config had been added in ApiRequestBuilder instance
     * @returns Promise of AxiosResponse or AxiosError
     */
    public async sendRequest(): Promise<AxiosResponse | AxiosError> {
        let response: AxiosResponse | AxiosError;
        try {
            response = (await axios(this.configObj)) as AxiosResponse;
        } catch (e) {
            response = e as AxiosError;
            console.error(response);
        }
        return response;
    }
}
