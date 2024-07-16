import config from "../config/config";

export const endpointV1 = "/api/v1";

export const cookieOptions: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: string;
} = {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "strict",
};
