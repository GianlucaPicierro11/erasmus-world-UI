
export interface JwtResponseModel {
    token: string;
    tokenType: string;
    id: number;
    username: string;
    email: string;
    roles: Array<string>;
}
