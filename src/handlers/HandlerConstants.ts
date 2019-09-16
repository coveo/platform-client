export interface IRestError {
    code: string;
    message: string;
}

export interface IRestResponse<T> {
    error?: IRestError;
    data?: T;
}
