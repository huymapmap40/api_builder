import { AxiosError, AxiosResponse, ResponseType, Method } from 'axios';

export enum METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
    OPTIONS = 'options'
}

export interface IRequestBuilder {
    sendRequest: () => Promise<AxiosResponse | AxiosError>;
}

export interface DataConfig {
    [key: string]: any;
}

export enum PARAM_TYPE {
    QUERY,
    PATH
}

export enum CONFIG_TYPE {
    URL = 'url',
    METHOD = 'method',
    BASE_URL = 'baseURL',
    TRANSFORM_REQUEST = 'transformRequest',
    TRANSFORM_RESPONSE = 'transformResponse',
    HEADERS = 'headers',
    PARAMS = 'params',
    DATA = 'data',
    TIMEOUT = 'timeout',
    WITH_CREDENTIALS = 'withCredentials',
    ADAPTER = 'adapter',
    AUTH = 'auth',
    RESPONSE_TYPE = 'responseType',
    RESPONSE_ENCODING = 'responseEncoding',
    XSRF_COOKIE_NAME = 'xsrfCookieName',
    XSRF_HEADER_NAME = 'xsrfHeaderName',
    ON_UPLOAD_PROGRESS = 'onUploadProgress',
    ON_DOWNLOAD_PROGRESS = 'onDownloadProgress',
    MAX_CONTENT_LENGTH = 'maxContentLength',
    MAX_BODY_LENGTH = 'maxBodyLength',
    VALIDATE_STATUS = 'validateStatus',
    MAX_REDIRECTS = 'maxRedirects',
    SOCKET_PATH = 'socketPath',
    HTTP_AGENT = 'httpAgent',
    HTTPS_AGENT = 'httpsAgent',
    PROXY = 'proxy',
    CANCEL_TOKEN = 'cancelToken',
    DECOMPRESS = 'decompress'
}

export interface DataParam {
    fieldName: string;
    value: string | number | null | undefined;
}

export interface DataRequest {
    [fieldName: string]: string | number;
}
