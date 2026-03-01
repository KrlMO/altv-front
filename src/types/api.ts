export interface SuccessResponse<T> {
    data: T;
    msg: string;
}

export interface ApiError {
    code: string;
    message: string;
}

export class ApiException extends Error {
    code?: string;
    status: number;

    constructor(message: string, status: number, code?: string) {
        super(message);
        this.status = status;
        this.code = code;
    }
}