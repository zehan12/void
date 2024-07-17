import { JwtPayload } from "jsonwebtoken";

export type RefreshToken = {
    refreshToken: string;
};

export interface DecodedJwtPayload extends JwtPayload {
    id: string;
}

export interface ResponseType {
    success: boolean;
    message: string;
    statusCode: number;
    data?: any;
}
