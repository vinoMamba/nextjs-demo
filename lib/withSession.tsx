import {withIronSession} from "next-iron-session";
import {NextApiHandler} from "next";

export function withSession(handler: NextApiHandler) {
    return withIronSession(handler, {
        password: "67fc4c7d-7aad-4322-b412-13c6cb82bdee",
        cookieName: "blog",
        cookieOptions: {
            secure: false
        }
    });
}