export interface ResponseHandler {
    canProcess(response: Response): boolean;
    process<T>(response: Response): Promise<T>;
}
