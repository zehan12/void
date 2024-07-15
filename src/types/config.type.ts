import { Secret } from "jsonwebtoken";

export interface Config {
    env: string | undefined;
    port: number | string;
    db: {
        url: string | undefined;
        password: string | undefined;
    };
    jwt: {
        accessToken: {
            secret: Secret;
            expiry: string | undefined;
        };
        refreshToken: {
            secret: Secret;
            expiry: string | undefined;
        };
    };
}
