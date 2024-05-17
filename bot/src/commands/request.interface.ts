export interface IApiRequest {
    readonly request: string;
    query(context: any | undefined): void;
}