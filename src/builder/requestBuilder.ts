import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { HttpRequestConfig } from 'src/objects/httpRequestConfig';
import { IRequestBuilder, DataConfig, PARAM_TYPE, DataRequest, CONFIG_TYPE } from './types';

export default class ApiRequestBuilder implements IRequestBuilder {
    private configObj: AxiosRequestConfig;

    constructor() {
        this.configObj = {};
    }

    private updateRequestConfig(data: any): AxiosRequestConfig {
        return {
            ...this.configObj,
            ...data
        } as AxiosRequestConfig;
    }

    public addConfig<K, V>(name: K | CONFIG_TYPE, value: V): this {
        const configRequest: DataConfig = {};
        configRequest[`${name}`] = value;
        this.configObj = this.updateRequestConfig(configRequest);
        return this;
    }

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

    public addHeaders(dataHeaders: DataRequest): this {
        this.configObj = this.updateRequestConfig({ headers: { ...this.configObj.headers, ...dataHeaders } });
        return this;
    }

    public addHeader(key: string, value: string | number): this {
        const header: any = {};
        header[key] = value;
        this.configObj = this.updateRequestConfig({ headers: { ...this.configObj.headers, ...header } });
        return this;
    }

    public async sendRequest(): Promise<AxiosResponse | AxiosError> {
        let response: AxiosResponse | AxiosError;
        try {
            response = (await axios(this.configObj)) as AxiosResponse;
        } catch (e) {
            response = e as AxiosError;
            console.log(response);
        }
        return response;
    }
}
