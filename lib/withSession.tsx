import {withIronSession} from "next-iron-session";
import {NextApiHandler} from "next";

export function withSession(handler: NextApiHandler) {
    return withIronSession(handler, {
        password: process.env.SECRET as string,
        cookieName: "blog",
        cookieOptions: {
            secure: false
        }
    });
}